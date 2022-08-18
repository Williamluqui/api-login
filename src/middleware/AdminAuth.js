const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization']
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1]
        try {
            let decoded =  jwt.verify(token,SECRET);
            if (decoded.role == 1) {
                next();
            } else {
                res.status(401).json({message: "você não tem permissão para acessar essa rota !"});
                return;
            }
        } catch (error) {
            res.status(401).json({message:"Você não esta logado no sistema !"})
        }
    }else{
        res.status(401).json({message:"você não está autenticado!"})
        return;
    }
}