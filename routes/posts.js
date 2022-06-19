const express = require("express");
const router = express.Router();
const  postsController = require("../controllers/posts_controller");
const passport = require("../config/passport-local-strategy");
const multer = require("multer");
const verifyToken = require("../middlewares/auth");
// store the posts in the images/posts
const upload = multer({dest:'public/images/uploads'});

router.post("/",upload.single("postImage"),verifyToken,postsController.create);

// Get all the posts
router.get("/all-posts",verifyToken,postsController.allPost);

// Get all the comments of a particular post
router.get("/:postId/comments",verifyToken,postsController.postComments);

// Delete the post
router.delete("/:postId",verifyToken,postsController.delete);

// Update the post
router.patch("/:postId",upload.single("postImage"),verifyToken,postsController.update);

// Paginated result API using ?page=1&&limit=5
router.get("/",verifyToken,postsController.getPosts);

module.exports = router;