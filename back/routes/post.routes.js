module.exports = app => {
    const posts = require("../controllers/post.controller");
    const auth = require('../middlewares/auth');
    const multer = require('../middlewares/multer');

    var router = require('express').Router();

    router.post('/newPost', multer, posts.newPost);
    router.get('/', posts.displayAllPosts);
    router.get('/:id', posts.displayOnePost);
    router.delete('/:id', posts.deletePost);
    router.put('/:id', multer, posts.updatePost);
    router.put('/like/:id', posts.likePost);
    router.delete('/like/:id', posts.unlikePost);

    app.use('/api/posts', router);
}