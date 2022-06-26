module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const auth = require('../middlewares/auth');


    var router = require('express').Router();

    router.post('/newComment', auth, comments.newComment);
    router.get('/:id', comments.displayAllComments);
    router.delete('/:id', comments.deleteComment);

    app.use('/api/comments', router);
}