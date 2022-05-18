const db = require("../../db")

module.exports = (req, res) => {
    db.query(`
        INSERT INTO comments (message, date_comment, id_post, id_user)
        VALUES (?, NOW(), ?, ?)
    `,
    [req.body.message, req.params.id_message, req.body.userId],
    (error) => {
        if(error) {
            res.status(500).json({error: error})
        } else {
            res.status(200).json({message: `Commentaire crée avec succés`})
        }
    })
}