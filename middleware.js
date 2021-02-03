const { check } = require("express-validator");
const PaymentPlan = require("./models/PaymentPlan");

const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const passport = require("passport");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const { refreshTokens } = require("./auth");

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
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
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
          await PaymentPlan.create({
            name: "Wallet",
            user: newUser._id,
            amount: 0,
            currency: "UGX",
          });

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
