const express = require("express");
const router = express.Router();
const passport = require("passport");
const { auth } = require("../middleware");

//import Controllers
const {
  signup,
  getUser,
  signin,
  updateUser,
  upload,
  forgotPassword,
  resetPassword,
  googleOAuth,
  facebookOAuth,
} = require("../controllers/userController.js");

const {
  validateRegister,
  resetPasswordValidator,
  forgotPasswordValidator,
} = require("../middleware.js");
//@route     POST /users/signup
//@decription  create new user
//@access      Public
router.post("/signup", validateRegister, signup);

//@route        GET /users/user
//@description  get user
//@acess        Private
router.get("/user", auth, getUser);
//@route        GET /users/editUser
//@description  get user
//@acess        Private
router.put("/editUser", auth, updateUser);
router.post("/uploadImage", auth, upload);
router.post("/forgetPassword", forgotPasswordValidator, forgotPassword);
router.post("/resetPassword", resetPasswordValidator, resetPassword);

//@route        GET /users/signin
//@description  get user
//@acess        Private
router.post("/signin", signin);

//@route          users/google
//@description      logging in using google
//this post route only takes in the access_token from the client
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  googleOAuth
);
//@route          users/auth/facebook
//@description      logging in using facebook
//this post route only takes in the access_token from the client
router.post(
  "/facebook",
  passport.authenticate("facebookToken", { session: false }),
  facebookOAuth
);
module.exports = router;
