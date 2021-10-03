const express = require("express");
const router = express.Router();
const passport = require("../config/passport-local-strategy");
const commentsController = require("../controllers/comments_controller");

// TODO : Add passport to for authenticating user middleware

// create Comment on a post
router.post("/create",passport.checkAuthentication,commentsController.create);

// delete the comment of a post
router.get("/delete/:commentId",passport.checkAuthentication ,commentsController.delete);

module.exports = router;