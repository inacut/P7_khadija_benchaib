const db = require("../../db")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = (req, res) => {

    let user = req.body

    db.query(
        `SELECT * FROM users WHERE email = ?`, 
        [user.email], 
        (error, result) => {
        if(error) {
            res.status(500).json({error})
        } else if (!result[0]) {
            res.status(401).json({ error: "Email incorrect !" });
        } else {
            bcrypt.compare(user.password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: " Mot de passe incorrect !" })
                }
                res.status(200).json({
                    message: 'Utilisateur connecté avec succès',
                    userId: result[0].id_user,
                    isAdmin: result[0].isAdmin,
                    token: jwt.sign(
                        { 
                            userId: result[0].id_user,
                            isAdmin: result[0].isAdmin
                        },
                        process.env.TOKEN_KEY,
                        { expiresIn: "30d" },
                    ),  
                })
            })
            .catch(error => res.status(500).json({error}));
        }
    })
    
}