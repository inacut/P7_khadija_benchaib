const db = require("../../db")

// models suppression d'un post (Admin ou Membre du post)
module.exports = (req, res) => {

    db.query(
        'SELECT id_user FROM share WHERE id_share = ?',
        [req.params.id_share],
        (err, result) => {
            if (err) {
                res.status(400).json({ message: "Impossible de supprimer le partage !" })
            } else if (result[0].id_user == req.body.userId || req.body.admin == 1){
                db.query(
                    'DELETE FROM share WHERE id_share = ?',
                    [req.params.id_share],
                    function(err) {
                        if (err) {
                            res.status(400).json({ error: "Impossible de supprimer le partage !" })
                        } else {
                            res.status(200).json({ message: "Partage supprimé avec succès !"})
                        }
                    }
                )
            } else {
                res.status(400).json({error: "L'utilisateur ne possède pas les droits pour supprimer le partage."})
            }
        }
    )
    

};