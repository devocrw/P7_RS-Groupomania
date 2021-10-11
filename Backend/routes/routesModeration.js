const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const moderationCtrl = require('../controllers/moderation');

try{
    router.get('/comments', auth, moderationCtrl.getAllComments);
    router.get('/posts', auth, moderationCtrl.getAllPosts);
    router.delete('/comment/:id', auth, moderationCtrl.deleteComment);
    router.delete('/post/:id', auth, moderationCtrl.deletePost);
}catch (error){
    console.log(error);
}

module.exports = router;