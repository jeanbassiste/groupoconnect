/*
// importer token d'authentification
const jwt = require("jsonwebtoken");

// middleware d'authentification
module.exports = (req, res, next) => {
  try {
    console.log('LAAAAAAA');
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1]; // récupération du token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décoder le token
    console.log(decodedToken);
    const userId = decodedToken.id; // récupération du userID0
    console.log(userId);
    console.log(req.body.id);
    if (req.body.id && req.body.id !== userId) {
      // vérifier si userID correspond au token
      console.log('vouvou');
      throw "l'utilisateur n'es pas valable";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("La requête n'est pas valide!"),
    });
  }
};
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log('WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        const userId = decodedToken.id;
        console.log(decodedToken);
        console.log(userId);
        if (req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID';
        }
        else {
            console.log('authentification réussie !')
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('invalid request')
        });
    }
}