const { PASSWORD } = require("../config/db.config");
const db = require("../models");
const userModel = require("../models/user.model");
const Op = db.Sequelize.Op;
const Post = db.posts;
const User = db.users;
const Like = db.likes;
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


    /*post.save()
    .then(() => res.status(201).json({ message: 'Post créé !'}))
    .catch( error => res.status(400).json({error}));*/
}

//Affichage des posts
exports.displayAllPosts = (req, res, next) => {
  console.log('START');
    Post.findAll({order: [
      ['updatedAt', 'DESC']
  ], include: [{model:User}, {model:Comment, include: [User]}, {model:Like}]})
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
    Post.findByPk(id, {include: [{model:User}, {model:Comment, include: [User]}, {model:Like}]})
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
  console.log("deleting post numero " + id);

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
  });    
}

//modifier un post
exports.updatePost = (req, res, next) => {
  const id = req.params.id;
    const postPic = { image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }

    Post.update(postPic, {where: {id:id}});
  


  console.log('ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
  console.log(req.headers);
  console.log(req.headers.authorization);
  console.log(req.body);

  Post.update(req.body, {
      where: {id: id}
  })
  .then(num => {
      Post.update(postPic, {where: {id:id}});
    
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