
const User = require("../models/User");
const PasswordToken = require("../models/Passwordtoken")

class UserController{
    //TODOS USUARIOS 
    async index(req,res){
        let users = await User.findAll();
        res.json(users)
    }
    // FILTRAR USUARIOS 
    async findUser(req,res){
        let {id} = req.params;
        let user = await User.findById(id)
        if (user == undefined) {
            res.status(404).json({message:"Usuario não encontrado!"})
        }else{
            res.json(user)
        }
    }

    async created(req,res){
        let {email, name, password, confirmPassword} = req.body;

        const regexEmail =
        /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
        const regexName = /^([A-Za-z])+$/

        try {

       if (!regexEmail.test(email) || email == undefined ) {
           return res.status(400).json({err: "O email Já esta cadastrado ou invalido!"});
           
        }
        if(!regexName.test(name) || name == undefined){
            return res.status(400).json({err: "Insira um nome valido!"})
        }
        if(password == undefined || password != confirmPassword){
            return  res.status(400).json({err: "Password invalido !"});
        }        
        var emailExist = await User.findEmail(email);
        
        if(emailExist){
            res.status(406).json({message:"Email já cadastrado!"})
            return;
        }

        await User.new(email.toLowerCase(), password, name);
        res.status(201).json({message: "User Create"})
    } catch (error) {
            console.log(error)
    }
    
  
    } 
    async edit(req, res){
        let {id, role,name, email} = req.body;
        let result = await User.update(id, email,name,role);
        if (result != undefined) {
            if (result.status) {
                res.json({message:"Usuário editado!"} )
            }else{
                res.json(result.error)
            }
        }else{
            res.status(406).json({message: "Ocorreu um erro no servidor!"})
        }

    }
    async remove(req, res){
        let {id} = req.params;
        let result = await User.delete(id);
        
        if (result.status) {
            res.status(200).json({message:"Usuário deletado com Sucesso !"})
        }else{
            res.status(406).json({message:result.error});
        }

    }
     async recoveryPassword(req, res){
        let {email} = req.body;
        let result = await PasswordToken.create(email);
        console.log(result.status)
        if (result.status){
            console.log(result.token)
            res.status(200).send(""+ result.token)
            
        } else {
            res.status(406).send(result.error)
        }

     }
}



module.exports = new UserController();