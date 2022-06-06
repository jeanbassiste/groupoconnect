module.exports = app => {
    const posts = require("../controllers/post.controller");

    var router = require('express').Router();

    router.post('/newPost', posts.newPost);

    app.use('/api/posts', router);
}