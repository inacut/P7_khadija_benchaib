module.exports = (req, res, next) => {

    if(
        typeof req.body.message == 'undefined' ||
        req.body.message == ''
    ){
        res.status(400).json({error: 'Veuillez écrire un message'})
    }  else {
        next()
    }
    
};