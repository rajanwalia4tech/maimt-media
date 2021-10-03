const express = require("express");
const router = express.Router();
const  postsController = require("../controllers/posts_controller");
const passport = require("../config/passport-local-strategy");
const multer = require("multer");

// store the posts in the images/posts
const upload = multer({dest:'public/images/uploads'});

router.post("/create",passport.checkAuthentication,upload.single("postImage"),postsController.create);

// Get all the posts
router.get("/all-posts",passport.checkAuthentication,postsController.allPost);

// Get all the comments of a particular post
router.get("/:postId/comments",passport.checkAuthentication,postsController.postComments);

// Delete the post
router.get("/:postId/delete",passport.checkAuthentication,postsController.delete);

// Update the post
router.post("/:postId/update",passport.checkAuthentication,upload.single("postImage"),postsController.update);

// Paginated result API using ?page=1&&limit=5
router.get("/",passport.checkAuthentication,postsController.getPosts);

module.exports = router;