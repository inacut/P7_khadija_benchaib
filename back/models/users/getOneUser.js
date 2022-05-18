const db = require("../../db")

module.exports = (req, res) => {
    db.query(
        'SELECT * FROM users WHERE id_user = ?',
        [req.params.id_user],
        (err, result) => {
            if(err){
                res.status(400).json({error: err})
            } else {
                res.status(200).json({
                    userId: result[0].id_user,
                    lastname: result[0].lastname,
                    firstname: result[0].firstname,
                    email: result[0].email,
                    image: result[0].image == '' ? '' : `${req.protocol}://${req.get("host")}/${result[0].image}`,
                    
                })
            }
        }
    )
}