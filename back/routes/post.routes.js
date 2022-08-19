module.exports = app => {
    const posts = require("../controllers/post.controller");
    const auth = require('../middlewares/auth');
    const multer = require('../middlewares/multer');

    var router = require('express').Router();

    router.post('/newPost', auth, multer, posts.newPost); //Création d'un nouveau post
    router.get('/', auth, posts.displayAllPosts); //Récupération de tous les posts
    router.get('/:id', auth, posts.displayOnePost); //Récupération d'un post
    router.delete('/:id', posts.deletePost); //Suppression d'un post
    router.put('/:id', auth, multer, posts.updatePost); //Modification d'un post
    router.put('/like/:id', auth, posts.likePost); //Liking d'un post
    router.delete('/like/:id', auth, posts.unlikePost); //Suppression d'un like
    router.put('/fav/:id', auth, posts.favPost); //Mise en favoris
    router.delete('/fav/:id', auth, posts.unfavPost); //Retirer des favoris

    app.use('/api/posts', router);
}