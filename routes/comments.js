const express = require("express");
const router = express.Router();
const passport = require("../config/passport-local-strategy");
const commentsController = require("../controllers/comments_controller");
const verifyToken = require("../middlewares/auth");
// TODO : Add passport to for authenticating user middleware

// create Comment on a post
router.post("/:postId",verifyToken,commentsController.create);

// delete the comment of a post
router.delete("/:commentId",verifyToken ,commentsController.delete);

module.exports = router;