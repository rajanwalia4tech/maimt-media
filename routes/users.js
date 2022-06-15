const express = require("express");
const router = express.Router();
const passport = require("../config/passport-local-strategy");
const verifyToken = require("../middlewares/auth");
const multer = require("multer");

// Store the image files in the uploads
const upload = multer({dest: 'public/images/uploads/'})
const usersController = require("../controllers/users_controller");

// show the profile
router.get("/profile",verifyToken,usersController.profile);

// Create user or sign up
router.post("/create",usersController.create);

// TODO: restricting the update the 
// Update Profile
router.post("/update",verifyToken,upload.single('avatar'),usersController.update);

router.post("/login",usersController.login);

module.exports = router;