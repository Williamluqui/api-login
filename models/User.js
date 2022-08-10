let knex = require("../database/connection");
let bcrypt = require("bcrypt");


class User{


    async findAll(){
        try {
          let result = await knex.select(['id', 'role', 'name', 'email']).table("users");
            return result;
        } catch (error) {
            console.log(error)
            return [];
        }

    }

    async findById(id){
        try {
          let result = await knex.select(['id', 'role', 'name', 'email']).where({id:id}).table("users");
            if (result.length > 0) {
              return result[0];
            }else{
                return undefined;
            }
        } catch (error) {
            console.log(error)
            return undefined;
        }

    }


    async new(email, password, name){
        try {
            let hash = await bcrypt.hash(password,10);
            await knex.insert({email, name, password:hash, role:0}).table("users")
        } catch (error) {
            console.log(error);
        }      
    }
    async findEmail(email){
        
        try {
          var result =  await knex.select("*").from("users").where({email: email});  // verificacao se email existe
            if (result.length > 0) {
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}


module.exports =  new User();