const express = require('express');
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
} = require('../controllers/post');
const {createPostValidator} = require('../validator');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');


const router = express.Router();

router.get('/posts', requireSignin, getPosts);
router.post(
  '/post/new/:userId',
  requireSignin,
  createPost,
  createPostValidator);

router.get("/posts/by/:userId", requireSignin, postsByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

//any route containing :userId, our app will first execute userByID()
router.param("userId", userById);
//any route containing :postId, our app will first execute postByID()
router.param("postId", postById);

module.exports = router;
