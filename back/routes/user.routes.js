module.exports = app => {
    const users = require("../controllers/user.controller");

    var router = require('express').Router();

    //création d'un utilisateur
    router.post('/signup', users.signup);

    //création d'un utilisateur
    router.post('/login', users.login);

    //récupération de tous les utilisteurs
    router.get('/', users.findAll);

    //récupération d'un utilisateur avec son id
    router.get('/:id', users.findOne);

    //mise à jour d'un utilisateur
    router.put('/:id', users.update);

    //suppression d'un utilisateur
    router.delete('/:id', users.delete);

    //suppression de tous les utilisateurs
    router.delete('/', users.deleteAll);

    app.use('/api/users', router);
}