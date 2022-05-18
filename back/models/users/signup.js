const db = require('../../db')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    
    let user = req.body

    db.query(
        `SELECT * 
        FROM users 
        WHERE email = ?`, 
        [user.email], 
        (error, result) => {
            if(error){
                res.status(500).json({error})
            } else if (!result[0]) {
                bcrypt
                .hash(user.password, 10)
                .then(hash => {
                    user.password = hash
                    db.query(
                        `INSERT INTO users (lastname, firstname, email, password, image) 
                        VALUES (?, ?, ?, ?, '')`, 
                        [user.lastname, user.firstname, user.email, user.password], (error) => {
                            if (error){
                                res.status(500).json({error})
                            } else{
                            res.status(201).json({message: `${user.lastname} ${user.firstname} ajouté avec succés`});
                        }
                    })
                })
                .catch(error => res.status(500).json({ error })) 
            } else{
                res.status(401).json({ error: "Email déjà utiliser" })
            }
        }
    ) 

}