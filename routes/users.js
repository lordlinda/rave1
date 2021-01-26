const express = require("express");
const router = express.Router();
const passport = require("passport");
//import Controllers
const {
  signup,
  getUser,
  signin,
  updateUser,
  upload,
  googleOAuth,
} = require("../controllers/userController.js");

const { validateRegister } = require("../middleware.js");
//@route     POST /users/signup
//@decription  create new user
//@access      Public
router.post("/signup", validateRegister, signup);

//@route        GET /users/user
//@description  get user
//@acess        Private
router.get("/user", passport.authenticate("jwt", { session: false }), getUser);
//@route        GET /users/editUser
//@description  get user
//@acess        Private
router.put(
  "/editUser",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.post(
  "/uploadImage",
  passport.authenticate("jwt", { session: false }),
  upload
);

//@route        GET /users/signin
//@description  get user
//@acess        Private
router.post("/signin", signin);

//@route          users/auth/google
//@description      logging in using google
//this post route only takes in the access_token from the client
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  googleOAuth
);

module.exports = router;
