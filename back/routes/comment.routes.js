module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const auth = require('../middlewares/auth');


    var router = require('express').Router();

    router.post('/newComment',auth, comments.newComment);
    router.get('/:id', auth, comments.displayAllComments);
    router.delete('/:id', auth, comments.deleteComment);
    router.put('/:id', auth, comments.updateComment);

    app.use('/api/comments', router);
}