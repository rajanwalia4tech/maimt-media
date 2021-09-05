const express = require("express");
const router = express.Router();

// import home controller
const homeController = require('../controllers/home_controller');

// routing to the 'homeController.home'
router.get('/',homeController.home);

// route to './users.js' route if request comes to '/users'
router.use('/users',require('./users'));

// // route to './post.js' route if request comes on '/posts'
// router.use('/posts',require('./posts'));

// // route to './comments.js' route if request comes on '/comments'
// router.use('/comments',require('./comments'));

module.exports = router;
