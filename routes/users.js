const express = require("express");
const router = express.Router();
const passport = require("../config/passport-local-strategy");
const multer = require("multer");

// Store the image files in the uploads
const upload = multer({dest: 'public/images/uploads/'})


const usersController = require("../controllers/users_controller");

// show the profile
router.get("/profile",passport.checkAuthentication,usersController.profile);

// Create user or sign up
router.post("/create",usersController.create);

// TODO: restricting the update the 
// Update Profile
router.post("/update",upload.single('avatar'),usersController.update);

router.post("/login", passport.authenticate('local', { // passport.authenticate is a built in function
	failureRedirect: '/', 
 }),usersController.login);

router.get("/logout",usersController.logout); 

module.exports = router;