module.exports = app => {
    const posts = require("../controllers/post.controller");
    const auth = require('../middlewares/auth');


    var router = require('express').Router();

    router.post('/newPost', auth, posts.newPost);
    router.get('/', posts.displayAllPosts);
    router.get('/:id', posts.displayOnePost);
    router.delete('/:id', posts.deletePost);
    router.put('/:id', posts.updatePost);
    router.put('/like/:id', posts.likePost);

    app.use('/api/posts', router);
}