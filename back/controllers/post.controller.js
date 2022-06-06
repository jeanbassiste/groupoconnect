const { PASSWORD } = require("../config/db.config");
const db = require("../models");
const Op = db.Sequelize.Op;
const Post = db.posts;

//Création d'un nouveau post
exports.newPost = (req, res, next) => {
    console.log('LE HEADER AUTH EST : ' + req.headers.authorization);
    if(!req.body.title || !req.body.text) {
        res.status(400).send({
            message: "Le post ne contient pas de texte ou de titre"
        });
        return;
    }

    const post =  {
       title: req.body.title,
       text: req.body.text,
       //userId: req.body.author 
    };
    

    Post.create(post)
    .then(data => {
        res.status(201).send({
            message: "Nouveau post créé"
        });
        res.send(data);
    })
    .catch(
        (error) => {
            console.log(error);
            console.log(Object.getOwnPropertyNames(error.errors));
            var message = [];
            console.log(error.errors.email.properties.message);
            Object.getOwnPropertyNames(error.errors).forEach(function (element) {
                console.log(element);
                var err = error.errors.email.properties.message;
                message += err;
            });
            res.status(400).json({
                message: message
            });            
        }
    )
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Il y a eu une erreur"
        });
    });

    /*post.save()
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch( error => res.status(400).json({error}));*/
}