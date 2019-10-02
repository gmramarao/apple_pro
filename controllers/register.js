"use strict";
class register {
    constructor(...params){
        var db = params[0];
        this.signup = (data)=>{
            return new Promise((resolve, reject)=>{
                try {
                    db.users.findOne({user_name : data.user_name}, (err, doc)=>{
                        if(err){
                            console.log(err);
                            reject(err);
                        } else {
                            if(doc){
                                reject("user already registered");
                            } else {
                                let obj = {
                                    user_name : data.user_name,
                                    name : data.name,
                                    password : data.password
                                }
                                db.users.insert(obj, (err, doc)=>{
                                    if(err){
                                        reject(err);
                                    } else {
                                        resolve(true);
                                    }
                                })
                            }
                        }
                    })
                } catch (err){
                    reject(err);
                }
                
            })
        }
    }
}

module.exports = register;