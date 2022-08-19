const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./back/config/.env" })

//Vérification de l'authenticité de l'utilisateur réalisant la requête. Utilisée sur toutes les requêtes api 
//On récupère le token qui est passé en header de la requête, et on le compare au token enregistré dans le process.env
//Si les deux sont similaires, on passe à la suite, sinon la requête est rejetée

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.token);
    const tokenId = decodedToken.id;
    if(req.body.userId && req.body.userId !== tokenId) throw "ID invalide";
    else next();
  } catch(error) { res.status(401).json({ message: "requête non identifiée " + error })};
}