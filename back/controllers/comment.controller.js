const { PASSWORD } = require("../config/db.config");
const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;


//Création d'un nouveau commentaire
exports.newComment = (req, res, next) => {
    if(!req.body.text) {
        res.status(400).send({
            message: "Le post ne contient pas de texte ou de titre"
        });
        return;
    }
    const comment =  {
       text: req.body.text,
       userId: req.body.author,
       postId: req.body.post
    };    
    Comment.create(comment)
    .then(data => {
        res.status(201).send({message: "Nouveau post créé", data});
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur."
        });
      });
}

//Affichage des posts
exports.displayAllComments = (req, res, next) => {
    const id = req.params.id;
    let postId = post.id;

    //retourne tous les commentaires du post en pensant bien à inclure l'utilisateurs et le post associé
    Post.findAll({ where: { postId: id } }, {order: [
      ['updatedAt', 'DESC']
  ], include: [{model:User}, {model:Post}]})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur."
      });
    });
}

exports.deleteComment = (req, res, next) => {
  const id = req.params.id;

  Comment.destroy({
      where: {id: id}
  })
  .then(num => {
      if(num == 1) {
          res.status(204).send({
              message: "Le commentaire a été supprimé"
          });
      } else {
          res.status(500).send({
              message: "impossible de supprimer le commentaire"
          });
      }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Erreur."
    });
  }); 
}

exports.updateComment = (req, res, next) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Commentaire mis à jour"
            });
        } else {
            res.status(500).send({
                message: 'Impossible de mettre à jour ce commentaire'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur."
        });
      }); 
}