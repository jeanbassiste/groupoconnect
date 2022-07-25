module.exports = app => {
    const users = require("../controllers/user.controller");
    const multer = require('../middlewares/multer');

    const auth = require('../middlewares/auth');

    var router = require('express').Router();

    //création d'un utilisateur
    router.post('/signup', users.signup);

    //connexion d'un utilisateur
    router.post('/login', users.login);

    //récupération de tous les utilisteurs
    router.get('/', auth, users.findAll);

    //récupération d'un utilisateur avec son id
    router.get('/:id', auth, users.findOne);

    //mise à jour d'un utilisateur
    router.put('/:id', auth, multer, users.update);

    //suppression de l'utilisateur (pas une vraie suppression)
    router.put('/delete/:id', auth, users.delete);

    app.use('/api/users', router);
}