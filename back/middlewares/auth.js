const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./back/config/.env" })


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.token);
    const tokenId = decodedToken.id;
    if(req.body.userId && req.body.userId !== tokenId) throw "ID invalide";
    else next();
  } catch(error) { res.status(401).json({ message: "requête non identifiée " + error })};
}