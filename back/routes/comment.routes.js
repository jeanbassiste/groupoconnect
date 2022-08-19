module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const auth = require('../middlewares/auth');


    var router = require('express').Router();

    router.post('/newComment',auth, comments.newComment); //création d'un commentaire
    router.get('/:id', auth, comments.displayAllComments); //Récupération des commentaires
    router.delete('/:id', auth, comments.deleteComment); //Suppression d'un commentaire
    router.put('/:id', auth, comments.updateComment); //Modification d'un commentaire

    app.use('/api/comments', router);
}