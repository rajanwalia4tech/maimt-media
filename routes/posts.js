const express = require("express");
const router = express.Router();
const  postsController = require("../controllers/posts_controller");
const multer = require("multer");

// store the posts in the images/posts
const upload = multer({dest:'public/images/uploads'});

router.post("/create",upload.single("postImage"),postsController.create);

// Get all the posts
router.get("/all-posts",postsController.allPost);

// Get all the comments of a particular post
router.get("/:postId/comments",postsController.postComments);

// Delete the post
router.get("/:postId",postsController.delete);

module.exports = router;