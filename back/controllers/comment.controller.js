const { PASSWORD } = require("../config/db.config");
const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;


//Création d'un nouveau commentaire
exports.newComment = (req, res, next) => {
    console.log('LE HEADER AUTH EST : ' + req.headers.authorization);
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

    console.log(comment);
    

    Comment.create(comment)
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
exports.displayAllComments = (req, res, next) => {
    const id = req.params.id;
    let postId = post.id;

    Post.findAll({ where: { postId: id } }, {order: [
      ['updatedAt', 'DESC']
  ], include: [{model:User}, {model:Post}]})
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

exports.deleteComment = (req, res, next) => {
  const id = req.params.id;
  console.log("deleting comment numero " + id);

  Comment.destroy({
      where: {id: id}
  })
  .then(num => {
      if(num == 1) {
          res.send({
              message: "Le commentaire a été supprimé"
          });
      } else {
          res.send({
              message: "impossible de supprimer le commentaire"
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "il y a eu un pb"
      });
  });  
}