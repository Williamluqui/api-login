const knex = require("../database/connection");
const User = require("./User");



class PasswordToken{

    async create(email){
      
        let user = await User.findByEmail(email);

        if(user != undefined){
            try {
                let token = Date.now();
                await knex.insert({
                    user_id:user.id,
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
    async validate(token){

        try {
        let result = await knex.select().where({token:token}).table("passwordtokens")
        
            if (result.length > 0 ) {
              let tokenUser = result[0];
              
                if (tokenUser.used){
                   return {status:false};
                }else{
                     return {status:true,tokenUser:tokenUser};
                }
            } else {
                return {status:false};
        } 
        }catch (error) {
            console.log(error)
            return {status:false};
            
        }
      

    }
    async setUsed(token){
        await knex.update({used:1}).where({token:token}).table("passwordTokens")
    }
}

module.exports = new PasswordToken();