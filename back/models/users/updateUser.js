const db = require("../../db")
const bcrypt = require('bcrypt')
const fs = require('fs');

 module.exports = (req, res) => { 

    let request = `UPDATE users SET lastname = ?, firstname = ?, email = ? `

    let data = [req.body.lastname, req.body.firstname, req.body.email]

    if(typeof req.file !== 'undefined') {
        console.log(req.file)
        request += `, image = ?`
        data.push(`${req.file.path}`)
        db.query('SELECT image FROM users WHERE id_user = ?', [req.params.id_user], (err, result) => {
            if(err) {
                console.log(err)   
            } else if(result[0].image != ''){
                fs.unlinkSync(result[0].image)
            }
        })
    }

    if(typeof req.body.password === 'undefined' || req.body.password == "") {

        request += `WHERE id_user = ?`
        data.push(Number(req.params.id_user))

        db.query(request, data, (err, result) => {
            if(err) {
                res.status(400).json({ err });
            }
            res.status(200).json({message: `Profil modifié avec succès`})
        })

    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            request += `, password = ? WHERE id_user = ?`
            data.push(hash)
            data.push(Number(req.params.id_user))

            db.query(request, data, (err, result) => {
                if(err) {
                    res.status(400).json({ err });
                }
                res.status(200).json({message: `Profil modifié avec succès`})
            })
        })

    }

}