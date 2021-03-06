const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const multer = require("multer");
const { createTokens } = require("../middleware");
const { validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);

/**creating a signed token */

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

      /**create token */
      const { access_token, refreshToken } = await createTokens(
        user,
        process.env.JWT_SECRET_2
      );
      /**set cookie for both access token and refresh token */
      res.cookie("access_token", access_token, {
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        secure: process.env.NODE_ENV === "production",
      });
      /**which we will send via axios */
      res.status(200).json({
        user: user.email,
      });
    } catch (err) {
      console.log(err);
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
        const { access_token, refreshToken } = await createTokens(
          user,
          process.env.JWT_SECRET_2 + user.password
        );
        /**set cookie for both access token and refresh token */
        res.cookie("access_token", access_token, {
          secure: process.env.NODE_ENV === "production",
        });
        res.cookie("refreshToken", refreshToken, {
          secure: process.env.NODE_ENV === "production",
        });
        //! FIND OUT WHY WE RETURN USER HERE
        return res.status(200).json({
          user: user.email,
          access_token,
          refreshToken,
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
      /**create token */
      const { access_token, refreshToken } = await createTokens(
        user,
        process.env.JWT_SECRET_2
      );
      /**set cookie for both access token and refresh token */
      res.cookie("access_token", access_token, {
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ user: user.email });
    } catch (error) {
      console.log(error);
    }
  },
  facebookOAuth: async (req, res) => {
    try {
      const user = req.user;
      /**create token */
      const { access_token, refreshToken } = await createTokens(
        user,
        process.env.JWT_SECRET_2
      );
      /**set cookie for both access token and refresh token */
      res.cookie("access_token", access_token, {
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ email: user.email });
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    /**if we  credentials are inavlid,we send a message to the client */
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: errors.array().map((error) => error.msg)[0] });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          msg: "User with that email does not exist",
        });
      }
      const token = jwt.sign(
        {
          sub: user._id,
        },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "20m",
        }
      );
      const emailData = {
        from: { name: "Pasbanc", email: process.env.EMAIL_FROM },
        to: email,
        template_id: "d-2db1a660ba7b486ab3f300d05419b789",
        dynamic_template_data: {
          subject: "Password Reset",
          url: `${process.env.CLIENT_URL}/users/password/reset/${token}`,
          name: `${user.username}`,
        },
      };
      sgMail
        .send(emailData)
        .then((sent) => {
          // console.log('SIGNUP EMAIL SENT', sent)
          return res.json({
            msg: `Email has been sent to ${email}. Follow the instruction to activate your account`,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      return res.json({
        msg: err.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    const { password, token } = req.body;
    const errors = validationResult(req);
    /**if we  credentials are inavlid,we send a message to the client */
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: errors.array().map((error) => error.msg)[0] });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD);
      if (!decoded) {
        return {};
      }
      const user = await User.findById(decoded.sub);
      user.password = password;
      await user.save();

      return res.json({
        msg: `Great! Now you can login with your new password`,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Expired link. Try again",
      });
    }
  },
};
