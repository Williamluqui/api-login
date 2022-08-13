const knex = require("../database/connection");
const User = require("./User");



class PasswordToken{

    async create(email){
      
        var user = await User.findByEmail(email);

        if(user != undefined){
            try {
                var token = Date.now()
                await knex.insert({user_id:user.id,
                    used:0,
                    token:token
                }).table("passwordtokens");
                return {status:true,token:token}
            } catch (error) {
                return {status:false, error: "O email passado não existe no banco de dados"}
            }


            
        }else{
            return {status:false, error: "O email passado não existe no banco de dados"}
        }
    }


}

module.exports = new PasswordToken();