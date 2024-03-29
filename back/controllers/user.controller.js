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
require("dotenv").config({ path: "./back/config/.env" })


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
                    process.env.token,
                    { expiresIn: '24h'}
                )
            });
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
              message:
                err.message || "Erreur."
            });
          });
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur."
        });
      });
    
};

//connexion d'un utilisateur existant
exports.login = (req, res, next) => {
    User.findOne({where: {emailAddress: req.body.emailAddress} })
    .then((user) => {
        
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
                    process.env.token,
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Erreur."
            });
          })})
    .catch(err => {
        res.status(500).send({
        message:
        err.message || "Erreur."
    });
})
    
};

//retrouver un utilisateur
exports.findOne = (req, res) => {
    const id = req.params.id;
    //On pense bien à inclure toutes les données nécessaires : posts de l'utilisateurs avec user, comments favoris et likes et favoris de l'utilisateur
    User.findByPk(id, {include: [{model:Post, include:[{model:User}, {model: Comment, include: [User]}, {model:Like}, {model:Fav}], order: ['updatedAt', 'DESC']}, {model: Fav, include: [{model: Post, include:[{model:User}, {model: Comment, include: [User]}, {model:Like}, {model:Fav}], order: ['updatedAt', 'DESC']}]}]})
    .then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `Cannot find User with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur."
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
            res.status(200).send({
                //On renvoie bien le token qui n'a plus le même rôle
                token: jwt.sign(
                    { id: req.params.id, role: req.body.role },
                    process.env.token,
                    { expiresIn: '24h'}
                )            
            });
        } else {
            res.status(500).send({
                message: 'Impossible de mettre à jour cet utilisateur'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur."
        });
      });
};

//supprimer un utilisateur
exports.delete = (req, res) => {
    const id = req.params.id;
    //Pas une réelle suppression : on change son role par 'deleted' (d'où fonction update et pas delete)
    User.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Utilisateur supprimé"
            });
        } else {
            res.status(500).send({
                message: 'Impossible de supprimer cet utilisateur'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur."
        });
      });
};