const router = require("express").Router();
const likeController = require("../controllers/like_controller");
const passport = require("../config/passport-local-strategy");

router.post("/like",passport.checkAuthentication,likeController.like);

router.get("/:postId",passport.checkAuthentication,likeController.isUserLiked);

module.exports = router;