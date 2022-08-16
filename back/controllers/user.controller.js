const { PASSWORD } = require("../config/db.config");
const fs = require('fs');
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Like = db.likes;
const Fav = db.favs;
const Comment = db.comments;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//création nouvel utilisateur
exports.signup = (req, res, next) => {
    //validation de la requête
    if(!req.body.emailAddress || !req.body.password) {
        res.status(400).send({
            message: "Problème de données transmises : email ou mot de passe manquant"
        });
        return;
    }

    //creation d'un utilisateur
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
            emailAddress: req.body.emailAddress,
            password: hash,
            role: req.body.role ? req.body.role: "user" 
        };
        User.create(user)
        .then(data => {
            res.status(201).send({
                message: "Utilisateur créé",
                userId: data.id,
                token: jwt.sign(
                    { id: data.id, role: data.role },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
            res.send(data);
        })
        .catch(
            (error) => {
                var message = [];
                Object.getOwnPropertyNames(error.errors).forEach(function (element) {
                    var err = error.errors.email.properties.message;
                    message += err;
                });
                res.status(400).json({
                    message: message
                });
            }
        );
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Il y a eu une erreur"
        });
    });
    
};

//connexion d'un utilisateur existant
exports.login = (req, res, next) => {
    User.findOne({where: {emailAddress: req.body.emailAddress} })
    .then((user) => {
        
        console.log(user);
        if(!user) {
            return res.status(404).send(
                {
                    message: "Utilisateur inexistant"
                }
            )
        }

        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(400).send(
                    {
                        message: "Mot de passe incorrect"
                    }
                )            
            }
            res.status(200).send({
                userId: user.id,
                token: jwt.sign(
                    { id: user.id, role: user.role },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        })
        .catch( error => res.status(500).send({
            message: user
        }))
        .catch( error => res.status(500).send({
            error
        }))
    })
    
};

//retrouver un utilisateur
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {include: [{model:Post, include:[{model:User}, {model: Comment, include: [User]}, {model:Like}], order: ['updatedAt', 'DESC']}, {model: Fav, include: [{model: Post, order: ['updatedAt', 'DESC']}]}]})
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id = " + id
        });
    });

};

//updater un utilisateur
exports.update = (req, res) => {
    const id = req.params.id;
        const profilePic = { image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` };
        User.update(profilePic, { where: {id:id} });
        User.update(req.body, { where: {id: id} })
    .then(data => {
        if (data) {
            res.send({
                token: jwt.sign(
                    { id: req.params.id, role: req.body.role },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )            });
        } else {
            res.send({
                message: 'Impossible de mettre à jour cet utilisateur'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Une erreur s'est produite dans la mise à jour de l'utilisateur " + id
        });
    });
};

//supprimer un utilisateur
exports.delete = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Utilisateur supprimé"
            });
        } else {
            res.send({
                message: 'Impossible de supprimer cet utilisateur'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Une erreur s'est produite dans la suppression de l'utilisateur " + id
        });
    });
};