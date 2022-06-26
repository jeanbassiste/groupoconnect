const { PASSWORD } = require("../config/db.config");
const db = require("../models");
const userModel = require("../models/user.model");
const Op = db.Sequelize.Op;
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

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
       userId: req.body.author,
       tag: req.body.tag
    };

    console.log(post);
    

    Post.create(post)
    .then(data => {
        res.status(201).send({message: "Nouveau post créé", data});
    })
    .catch(
        (error) => {
            console.log(error);
        }
    )


    /*post.save()
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch( error => res.status(400).json({error}));*/
}

//Affichage des posts
exports.displayAllPosts = (req, res, next) => {
    Post.findAll({order: [
      ['updatedAt', 'DESC']
  ], include: [{model:User}, {model:Comment, include: [User]}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

//Affichage d'un post
exports.displayOnePost = (req, res, next) => {
    const id = req.params.id;
    Post.findByPk(id, {include: [{model:User}, {model:Comment, include: [User]}]})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
}