const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {

  
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken =  jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId
    req.body.admin = decodedToken.isAdmin;
    req.body.userId = userId

    if (typeof userId == 'undefined') {
      throw 'Utilisateur non connecté';
    } else {
      next();
    } 
  } catch {
    res.status(401).json({
      error: 'Mauvaise requête'
    });
  }
};