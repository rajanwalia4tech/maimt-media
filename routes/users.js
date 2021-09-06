const express = require("express");
const router = express.Router();
const passport = require("../config/passport-local-strategy");

const usersController = require("../controllers/users_controller");

router.get("/profile",passport.checkAuthentication,usersController.profile);

router.post("/create",usersController.create);

router.post("/login", passport.authenticate('local', { // passport.authenticate is a built in function
	failureRedirect: '/', 
 }),usersController.login);

router.get("/logout",usersController.logout); 

module.exports = router;