const db = require("../../db")

module.exports = (req, res, next) => {

    db.query(
        'SELECT id_user FROM comments WHERE id_comment = ?',
        [req.params.id_comment],
        (err, result) => {
            if (err) {
                res.status(400).json({ message: "Impossible de supprimer le commentaire !" })
            } else if (result[0].id_user == req.body.userId || req.body.admin == 1){
                db.query(`
                    UPDATE comments 
                    SET message = ?
                    WHERE id_comment = ?
                `,
                [req.body.message, req.params.id_comment],
                (error, result) => {
                    if(error) {
                        res.status(500).json({error: error})
                    } else {
                        res.status(200).json({message: `Commentaire modifié avec succés`})
                    }
                })  
            } else {
                res.status(400).json({error: "L'utilisateur ne possède pas les droits pour modifier le commentaire."})
            }
        }
    )
}