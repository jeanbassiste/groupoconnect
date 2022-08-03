module.exports = app => {
    const posts = require("../controllers/post.controller");
    const auth = require('../middlewares/auth');
    const multer = require('../middlewares/multer');

    var router = require('express').Router();

    router.post('/newPost', auth, multer, posts.newPost);
    router.get('/', auth, posts.displayAllPosts);
    router.get('/:id', auth, posts.displayOnePost);
    router.delete('/:id', posts.deletePost);
    router.put('/:id', multer, posts.updatePost);
    router.put('/like/:id', auth, posts.likePost);
    router.delete('/like/:id', auth, posts.unlikePost);

    app.use('/api/posts', router);
}