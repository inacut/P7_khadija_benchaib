const db = require("../../db")

//Models partager un post
module.exports = (req, res) => {
    db.query(
        "INSERT INTO share (id_user, id_post, date_share) VALUES (?, ?, NOW())", 
        [ req.body.userId, req.params.id_message ], 
        function (error) {
        if (error) {
            return res.status(500).json(error);
        };
        res.status(201).json({
            message: "Publication partagée !"
        });
    });
    
};  