const express = require('express');
const {getPosts, createPost, postsByUser} = require('../controllers/post');
const {createPostValidator} = require('../validator');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');


const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post/new/:userId',requireSignin, createPost, createPostValidator);

router.get("/posts/by/:userId", requireSignin, postsByUser);
//any route containing :userId, our app will first execute userByID()
router.param("userId", userById);


module.exports = router;
