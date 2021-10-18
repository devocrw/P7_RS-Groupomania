const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

try{
    router.get('/', auth, postCtrl.getAllPosts);
    router.post('/', auth, postCtrl.createPost);
    router.put('/:id', auth, postCtrl.updatePost);
    router.delete('/:id', auth, postCtrl.deletePost); 

    
    router.get('/likes', auth, postCtrl.getAllLikes);
    router.post('/:id/like', auth, postCtrl.postLike);
 
    router.get('/:id/comments', auth, postCtrl.getComments);
    router.post('/:id/comments', auth, postCtrl.createComment);
    router.put('/comments/:id', auth, postCtrl.updateComment);
    router.delete('/comments/:id', auth, postCtrl.deleteComment); 

}catch (error){
    console.log(error);
} 

module.exports = router;

