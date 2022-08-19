const { PASSWORD } = require("../config/db.config");
const db = require("../models");
const userModel = require("../models/user.model");
const Op = db.Sequelize.Op;
const Post = db.posts;
const User = db.users;
const Like = db.likes;
const Fav = db.favs;
const Comment = db.comments;
const fs = require('fs');

//Création d'un nouveau post
exports.newPost = (req, res, next) => {
    if(!req.body.title || !req.body.text) {
      //on vérifie que la requête soit complète
        res.status(400).send({
            message: "Le post ne contient pas de texte ou de titre"
        });
        return;
    }
    //On prépare l'upload de l'image
    const postPic = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

    //On récupère les infos du post à envoyer
    const post =  {
       title: req.body.title,
       text: req.body.text,
       userId: req.body.author,
       tag: req.body.tag,
       image: postPic
      };

    //Création du post en back
    Post.create(post)
    .then(data => {
      res.status(201).send({message: "Nouveau post créé", data});
    })
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

//Affichage des posts
exports.displayAllPosts = (req, res, next) => {
  //On récupère tous les posts et on pense bien à inclure toutes les infos nécessaires : utilisateur, likes, favoris et commentaires (eux mêmes incluant les utilisateurs)
    Post.findAll({order: [
      ['updatedAt', 'DESC']
  ], include: [{model:User}, {model:Comment, include: [User]}, {model:Like}, {model: Fav}]})
    .then(data => {
      res.status(200).send(data);
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
    //On récupère le post correspondant à l'id de la requête et on pense bien à inclure toutes les infos nécessaires : utilisateur, likes, favoris et commentaires (eux mêmes incluant les utilisateurs)
    const id = req.params.id;
    Post.findByPk(id, {include: [{model:User}, {model:Comment, include: [User]}, {model:Like}, {model: Fav}]})
      .then(data => {
        if (data) {
          res.status(200).send(data);
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

//supprimer un post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id)
  .then(data => {
    //On pense bien à supprimer l'image du back en supprimant le post
    const filename = data.dataValues.image.split('/images/')[1];
    fs.unlink(`./back/images/${filename}`, ()=> {
      Post.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.status(204).send({
                message: "Le post a été supprimé"
            });
        } else {
            res.status(500).send({
                message: "impossible de supprimer le post"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "il y a eu un pb"
        });
    })
    }
    )

  })
}

//modifier un post
exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id)
  .then(data => {
    if(req.file) {
      const filename = data.dataValues.image.split('/images/')[1];
      //On supprime l'ancienne image avant d'uploader la nouvelle
      fs.unlink(`./back/images/${filename}`, ()=> {
        const postPic = { image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` } 
        //On update l'image
        Post.update(postPic, {where: {id:id}});
    })
    }
    //On update le contenu du post
  Post.update(req.body, {
      where: {id: id}
  })
  .then(num => {

      if (num == 1) {
          res.status(200).send({
              message: "Post mis à jour"
          });
      } else {
          res.status(500).send({
              message: 'Impossible de mettre à jour ce post'
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "Une erreur s'est produite dans la mise à jour du post " + id
      });
  });  

  })    
}

exports.likePost = (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.userId;
  
  let like = {
    userId: req.body.userId,
    postId: id
  }

  Like.create(like)
  .then(num => {
    res.status(200).send({
      message: "Post mis à jour"
    });
})
.catch(err => {
    res.status(500).send({
        message: "Une erreur s'est produite dans la mise à jour du post " + id
    });
});  

}

exports.unlikePost = (req, res, next) => {
  const id = req.params.id;

  Like.destroy({
      where: {id: id}
  })
  .then(num => {
      if(num == 1) {
          res.status(204).send({
              message: "Le like a été supprimé"
          });
      } else {
          res.status(500).send({
              message: "impossible de supprimer le like"
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "il y a eu un pb"
      });
  });  
}

exports.favPost = (req, res, next) => {
  const id = req.params.id;

  let fav = {
    userId: req.body.userId,
    postId: id
  }

  Fav.create(fav)
  .then(num => {
    res.status(200).send({
      message: "Post mis à jour"
    });
})
.catch(err => {
    res.status(500).send({
        message: "Une erreur s'est produite dans la mise à jour du post " + id
    });
});  

}

exports.unfavPost = (req, res, next) => {
  const id = req.params.id;

  Fav.destroy({
      where: {id: id}
  })
  .then(num => {
      if(num == 1) {
          res.status(204).send({
              message: "Le fav a été supprimé"
          });
      } else {
          res.status(500).send({
              message: "impossible de supprimer le fav"
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "il y a eu un pb"
      });
  });  
}