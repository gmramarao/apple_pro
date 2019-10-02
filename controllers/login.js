"use strict";
class login {
    constructor(...params){
        var db = params[0];
        var jwt = params[1];
        this.signin = (data)=>{
            console.log(data);
            return new Promise((resolve, reject)=>{
                try {   
                    db.users.findOne({user_name : data.user_name, password : data.password}, (err, doc)=>{
                        if(err){
                            reject(err);
                        } else {
                            if(doc){
                                var token = jwt.sign(data, "secret", {
                                    expiresIn: "24h" // expires in 24 hours
                                 });
                                 resolve({token : token});
                            } else {
                                reject("user_name, password not matched");
                            }
                        }
                    })
                } catch(err){
                    reject(err);
                }
                
            })
        }
    }
}

module.exports = login;