const db = require("../../db")

// models suppression d'un post (Admin ou Membre du post)
module.exports = (req, res) => {

    db.query(
        `SELECT id_user 
        FROM posts 
        WHERE id_post = ?`,
        [req.params.id_message],
        (error, result) => {
            if (error) {
                res.status(400).json({error})
            } else if (result[0].id_user == req.body.userId || req.body.admin == 1){
                db.query(
                    'DELETE FROM comments WHERE id_post = ?',
                    [req.params.id_message],
                    (error) => {
                        if(error) {
                            res.status(500).json({error})
                        }
                    }
                )
                db.query(
                    'DELETE FROM share WHERE id_post = ?',
                    [req.params.id_message],
                    (error) => {
                        if (error) {
                            res.status(400).json({error})
                        } else {
                            db.query(  
                                "DELETE FROM posts WHERE id_post = ?",
                                [req.params.id_message], 
                                (error) => {   
                                if (error) {
                                    res.status(400).json({error})
                                }
                                res.status(200).json({ message: "Post supprimé !" })
                            });
                        }
                    }
                )
            } else {
                res.status(400).json({error: "L'utilisateur ne possède pas les droits pour supprimer le post."})
            }
        }
    )
    

};  