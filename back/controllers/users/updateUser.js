
//modifier le profil d'un user (nom , prenom, photo de profile, mot de passe, email)
module.exports = (req, res, next) => {

    let validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let { lastname, firstname, email, password } = req.body;
    console.log(req.body)

    if(email == "" || email == undefined || !validEmail.test(email)){
        return res.status(400).json({error : "Veuillez saisir un email valide"})
    } else if((password != "" || password != undefined) && password < 8) { 
        return res.status(400).json({error : "Votre mot de passe doit contenir 8 caractères ou plus"})
    } else if(firstname == "" || firstname == undefined){
        return res.status(400).json({error : "veuillez saisir un prenom"})
    } else if(lastname == "" || lastname == undefined) { 
        return res.status(400).json({error : "veuillez saisir un nom"})    
    } else {
        next()  
    }

}