const router = require("express").Router();
const likeController = require("../controllers/like_controller");

router.post("/like",likeController.like);

router.get("/:postId",likeController.isUserLiked);

module.exports = router;