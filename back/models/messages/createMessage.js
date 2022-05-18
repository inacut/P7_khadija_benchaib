const db = require("../../db")

module.exports = (req, res) => {

    db.query(
        `INSERT INTO posts (message, date_post, id_user) VALUES (?, NOW(), ?)`,
        [req.body.message, req.body.userId], 
        (error) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(201).json({
                message: "Message crée avec succés !"
            })
        };
    });  
    
};