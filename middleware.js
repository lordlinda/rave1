const { check } = require("express-validator");

const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const passport = require("passport");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const { refreshTokens } = require("./auth");

var cookieExtractor = async (req) => {
  let token = req.headers["authorization"];
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return token;
    } catch (err) {
      const refreshtoken = req.headers["x-refresh-token"];
      console.log(token);
      token = refreshtoken;
      return token;
    }
  }
};
module.exports = {
  validateRegister: [
    check("username")
      .isLength({ min: 3 })
      .withMessage("username must be greater than 3 chars"),
    check("email").isEmail().withMessage("please enter a valid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("password must be greater than 8 chars"),
  ],
  forgotPasswordValidator: [
    check("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Must be a valid email address"),
  ],
  resetPasswordValidator: [
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least  6 characters long"),
  ],
  googleAuth: passport.use(
    new GoogleTokenStrategy(
      {
        clientID:
          "490182146410-n4p1v19co66t9r0lv387o5dpm8cmoi5f.apps.googleusercontent.com",
        clientSecret: "bulbZC2V9rNZciq9k2V84Va-",
        passReqToCallback: true,
      },
      async function (req, accessToken, refreshToken, profile, done) {
        try {
          // 0.Server receives access token from Client
          //1.check if the current client exists in our database
          const alreadyUser = await User.findOne({
            $and: [{ email: profile.emails[0].value }],
          });
          //2.If we have this user in our database we return the user
          if (alreadyUser) {
            //this user can now be accesses as req.user
            return done(null, alreadyUser);
          }
          //3.If not we create this user and add them to our database
          //we create  new user
          const createUser = new User({
            methods: "google",
            //this is the email part from the profile
            //emails: [ { value: 'marialindananono@gmail.com', type: 'ACCOUNT' } ],
            email: profile.emails[0].value,
            username: profile.name.givenName,
            photoUrl: profile._json.picture,
          });

          const newUser = await createUser.save();
          return done(null, newUser);
        } catch (error) {
          done(error, false, error.message);
        }
      }
    )
  ),
  facebookAuth: passport.use(
    "facebookToken",
    new FacebookTokenStrategy(
      {
        //we get the app id and secret from the config file
        clientID: "953574055178048",
        clientSecret: "61df5052cc97ee00e553f1da877eb415",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          //check if we have the user in our database using  facebook id
          const alreadyUser = User.findOne({
            $and: [{ email: profile.emails[0].value }],
          });
          //if we do we return the user which will be stored as req.user
          if (alreadyUser) {
            return done(null, alreadyUser);
          }
          //if the user doent exist we create new user
          //3.If not we create this user and add them to our database
          //we create  new user
          const createUser = new User({
            methods: "facebook",
            //this is the email part from the profile
            //emails: [ { value: 'marialindananono@gmail.com', type: 'ACCOUNT' } ],
            email: profile.emails[0].value,
            username: profile.name.givenName,
            photoUrl: profile.photos[0].value,
          });

          const newUser = await createUser.save();
          return done(null, newUser);
        } catch (error) {
          done(error, false, error.message);
        }
      }
    )
  ),
  createTokens: async (user, SECRET_2) => {
    const access_token = jwt.sign(
      {
        sub: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      {
        sub: user._id,
      },
      SECRET_2,
      { expiresIn: "15m" }
    );
    return {
      access_token,
      refreshToken,
    };
  },
  auth: async (req, res, next) => {
    /**first we get the access token ,if it is exired then we get the refrsh token */
    let token = req.headers["authorization"];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          return res.status(401).json({
            msg: "Unauthorised",
          });
        }
        const user = await User.findById(sub);
        if (!user) {
          return res.status(401).json({
            msg: "Unauthorised",
          });
        }
        req.user = user;
      } catch (err) {
        const refreshtoken = req.headers["x-refresh-token"];
        const { access_token, refreshToken, user } = await refreshTokens(
          refreshtoken
        );
        if (!user) {
          return res.status(401).json({
            msg: "UnAuthorised",
          });
        }
        if (access_token && refreshToken) {
          res.set("authorization", access_token);
          res.set("x-refresh-token", refreshToken);
        }
        req.user = user;
      }
    }
    next();
  },
};
