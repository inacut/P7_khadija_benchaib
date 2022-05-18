module.exports = (req, res, next) => {

    // imposer les 4 champs obligatoire pour s'inscrire

    let { lastname, firstname, email, password } = req.body;

    if(email == "" || email == undefined){
        return res.status(400).json({error : "veuillez saisir un email"})
    } else if(password == "" || password == undefined) { 
        return res.status(400).json({error : "veuillez saisir un mot de passe"})    
    } else if(firstname == "" || firstname == undefined){
        return res.status(400).json({error : "veuillez saisir un prenom"})
    } else if(lastname == "" || lastname == undefined) { 
        return res.status(400).json({error : "veuillez saisir un nom"})    
    } else if(password.length < 8){
        return res.status(400).json({error : "votre mot de passe doit contenir 8 caractères ou plus"})    
    } else {
        let validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if(!validEmail.test(email)){
            return res.status(400).json({error : "Email invalide"})
        } else {
            next()  
        }
    }
};