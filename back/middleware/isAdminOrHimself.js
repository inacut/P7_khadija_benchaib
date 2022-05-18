const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const admin = decodedToken.admin;
    const userId = decodedToken.userId;

    if (admin == 1 || req.params.id_user == userId) {
        next();
    } else {
        throw `Vous n'avez pas la permission pour accéder à ce contenu`;
    } 
  } catch {
    res.status(401).json({
      error: `Vous n'avez pas la permission pour accéder à ce contenu`
    });
  }
};