const { check } = require("express-validator");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const passport = require("passport");
const User = require("./models/User.js");

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

  passportAuth: passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwt_payload, done) {
        //jwt_payload  contains the decode token where we stored our id
        //so we pick the id from the decode token and find the user
        User.findOne({ _id: jwt_payload.sub }, function (err, user) {
          //if there is an error we return the error without the user
          if (err) {
            return done(err, false);
          }
          if (user) {
            // if we  return a  user which is stored as req.user
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    )
  ),
  googleAuth: passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        // 0.Server receives access token from Client
        //1.check if the current client exists in our database
        User.findOne({ id: profile.id, methods: "google" })
          //2.If we have this user in our database we return the user
          .then((user) => {
            if (user) {
              //this user can now be accesses as req.user
              return done(null, user);
            }
            //3.If not we create this user and add them to our database
            //we create  new user
            const newUser = new User({
              methods: "google",

              id: profile.id,
              //this is the email part from the profile
              //emails: [ { value: 'marialindananono@gmail.com', type: 'ACCOUNT' } ],
              email: profile.emails[0].value,
            });
            //save the user
            //this time there will not be using bcrypt as the method is not local
            newUser
              .save()
              //1.if the user is saved to the database we return  the user
              .then((user) => {
                //this user can now be accesses as req.user

                return done(null, user);
              })
              //2.if not we send the erro back to the client
              .catch((err) => {
                done(err, false, err.message);
              });
          })
          .catch((err) => {
            console.error(err);
            //done(err,false,err.message)
          });
      }
    )
  ),
  createTokens: async (user) => {
    const createToken = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
    const createRefreshToken = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    return {
      createToken,
      createRefreshToken,
    };
  },
};
