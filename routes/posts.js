const express = require("express");
const router = express.Router();
const  postsController = require("../controllers/posts_controller");
const multer = require("multer");

// store the posts in the images/posts
const upload = multer({dest:'public/images/uploads'});

router.post("/create",upload.single("postImage"),postsController.create);

router.get("/all-posts",postsController.allPost);

module.exports = router;