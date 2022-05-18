module.exports = (req, res, next) => {
    let {email, password } = req.body;
    if(email == "" || email == undefined){
        return res.status(400).json({error : "veuillez saisir un email"})
    } else if(password == "" || password == undefined) { 
        return res.status(400).json({error : "veuillez saisir le mot de passe"})    
    }  else {
        next()
    }
}