const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const multer = require("multer");
const PaymentPlan = require("../models/PaymentPlan.js");

const { validationResult } = require("express-validator");

/**creating a signed token */
function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}
function createRefreshToken() {
  return res.cookie(
    "refreshToken",
    jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    ),
    {
      httpOnly: true,
    }
  );
}
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

module.exports = {
  //@route     POST /users/signup
  //@decription  create new user
  //@access      Public
  signup: async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    /**if we  credentials are inavlid,we send a message to the client */
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: errors.array().map((error) => error.msg)[0] });
    }
    try {
      /**if credentials are valid we ensure that we dont have the same user in our email */
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      /**otherwise we create a new user and send it to the database */
      user = new User({
        methods: "local",
        username,
        email,
        password,
      });

      await user.save();
      /**create wallet for user */
      await PaymentPlan.create({
        name: "Wallet",
        user: user._id,
        amount: 0,
      });
      /**create token */
      const token = createToken(user);
      res.status(200).json({
        token: token,
        user: user.email,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.msg,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email }).select(
        "-password"
      );
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      let findArgs = {};
      for (let key in req.body) {
        findArgs[key] = req.body[key];
      }
      console.log(findArgs);
      await User.updateOne({ _id: req.user._id }, { ...findArgs });
      res.status(200).json({ msg: "User details updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //@route     POST /users/signin
  //@decription  login user
  //@access      Public
  signin: async (req, res) => {
    //we receive the email and password from the client
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      //if we dont find a user we return an error msg
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      //if we find a user with that email,we now compare if the passwords match
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = createToken(user);
        //! FIND OUT WHY WE RETURN USER HERE
        return res.status(200).json({
          user: user.email,
          token: token,
        });
      }
      //if passwords dont match return an error
      res.status(400).json({ msg: "User not found" });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  },
  upload: async (req, res) => {
    try {
      upload(req, res, (err) => {
        if (err) {
          return res.json({ success: false, err });
        }
        return res.json({
          success: true,
          filePath: res.req.file.path,
          fileName: res.req.file.filename,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  googleOAuth: async (req, res) => {
    try {
      const user = req.user;
      const token = createToken(user);
      res.status(200).json({ token, email: user.email });
    } catch (error) {
      console.log(error);
    }
  },
  facebookAuth: async (req, res) => {
    try {
      const user = req.user;
      const token = createToken(user);
      res.status(200).json({ token, email: user.email });
    } catch (error) {
      console.log(error);
    }
  },
};
