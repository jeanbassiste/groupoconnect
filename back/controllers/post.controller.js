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
    console.log('LE HEADER AUTH EST : ' + req.headers.authorization);
    if(!req.body.title || !req.body.text) {
        res.status(400).send({
            message: "Le post ne contient pas de texte ou de titre"
        });
        return;
    }
    console.log('juste avant limage');
    const postPic = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    console.log(postPic);

    const post =  {
       title: req.body.title,
       text: req.body.text,
       userId: req.body.author,
       tag: req.body.tag,
       image: postPic
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
}

//Affichage des posts
exports.displayAllPosts = (req, res, next) => {
  console.log('START');
    Post.findAll({order: [
      ['updatedAt', 'DESC']
  ], include: [{model:User}, {model:Comment, include: [User]}, {model:Like}, {model: Fav}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('CATTTTAAAAAAAASTROPHEEEE')
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

//Affichage d'un post
exports.displayOnePost = (req, res, next) => {
    const id = req.params.id;
    Post.findByPk(id, {include: [{model:User}, {model:Comment, include: [User]}, {model:Like}, {model: Fav}]})
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

//supprimer un post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id)
  .then(data => {
    const filename = data.dataValues.image.split('/images/')[1];
    fs.unlink(`./back/images/${filename}`, ()=> {
      Post.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Le post a été supprimé"
            });
        } else {
            res.send({
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
  console.log("deleting post numero " + id);


}

//modifier un post
exports.updatePost = (req, res, next) => {
  console.log('on rentre dans le update');
  console.log(req.body);
  const id = req.params.id;
  Post.findByPk(id)
  .then(data => {
    if(req.file) {
      const filename = data.dataValues.image.split('/images/')[1];
      fs.unlink(`./back/images/${filename}`, ()=> {
        const postPic = { image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` } 

        Post.update(postPic, {where: {id:id}});
    })
    }
  Post.update(req.body, {
      where: {id: id}
  })
  .then(num => {

      if (num == 1) {
          res.send({
              message: "Post mis à jour"
          });
      } else {
          res.send({
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
  console.log('LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIKE');
  console.log("début du liking");
  const id = req.params.id;
  const userId = req.body.userId;
  console.log('id post = ' + id + ' et id user = ' + userId);
  
  let like = {
    userId: req.body.userId,
    postId: id
  }

  Like.create(like)
  .then(num => {
    console.log('on est entré dans le then');
    console.log(num);
    res.status(201).send({
      message: "Post mis à jour"
    });
})
.catch(err => {
  console.log('nope, mais avec un 500');
    res.status(500).send({
        message: "Une erreur s'est produite dans la mise à jour du post " + id
    });
});  

}

exports.unlikePost = (req, res, next) => {
  console.log('DISLIIIIIIIIIIKE');
  const id = req.params.id;
  console.log("deleting like numero " + id);

  Like.destroy({
      where: {id: id}
  })
  .then(num => {
      if(num == 1) {
          res.send({
              message: "Le like a été supprimé"
          });
      } else {
          res.send({
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
  console.log('start fav');
  const id = req.params.id;
  const userId = req.body.userId;

  let fav = {
    userId: req.body.userId,
    postId: id
  }

  Fav.create(fav)
  .then(num => {
    console.log('on est entré dans le then');
    console.log(num);
    res.status(201).send({
      message: "Post mis à jour"
    });
})
.catch(err => {
  console.log('nopinop, mais avec un 500');
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
          res.send({
              message: "Le fav a été supprimé"
          });
      } else {
          res.send({
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