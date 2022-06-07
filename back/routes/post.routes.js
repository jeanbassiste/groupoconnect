module.exports = app => {
    const posts = require("../controllers/post.controller");
    const auth = require('../middlewares/auth');


    var router = require('express').Router();

    router.post('/newPost', auth, posts.newPost);
    router.get('/', posts.displayAllPosts);
    router.get('/:id', posts.displayOnePost);

    app.use('/api/posts', router);
}