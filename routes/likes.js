const router = require("express").Router();
const likeController = require("../controllers/like_controller");

router.post("/like",likeController.like);


module.exports = router;