"use strict";
class user_experience {
    constructor(...params){
        var db = params[0];
        var jwt = params[1];
        this.add_experience = (data)=>{
            console.log(data);
            return new Promise((resolve, reject)=>{
                try {   
                    let obj = {
                        user_name : data.user_name,
                        years_of_experience : data.years_of_experience,
                        company : data.company
                    }
                    db.user_experience.insert(obj, (err, doc)=>{
                        if(err){
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    })
                } catch(err){
                    reject(err);
                }
                
            })
        }
        this.update_experience = (data)=>{
            console.log(data);
            return new Promise((resolve, reject)=>{
                try {   
                    db.user_experience.update({user_name : data.user_name, company : data.company}, {$set : {years_of_experience : data.years_of_experience}}, (err, doc)=>{
                        if(err){
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    })
                } catch(err){
                    reject(err);
                }
                
            })
        }

        this.delete_experience = (data)=>{
            console.log(data);
            return new Promise((resolve, reject)=>{
                try {   
                    let obj = {
                        user_name : data.user_name,
                        years_of_experience : data.years_of_experience,
                        company : data.company
                    }
                    db.user_experience.remove({user_name : data.user_name, company : data.company}, (err, doc)=>{
                        if(err){
                            reject(err);
                        } else {
                            console.log(doc);
                            resolve(true);
                        }
                    })
                } catch(err){
                    reject(err);
                }
                
            })
        }

        this.get_experience = (data)=>{
            console.log(data);
            return new Promise((resolve, reject)=>{
                try {   
                    
                    db.user_experience.find({user_name : data.user_name}, (err, doc)=>{
                        if(err){
                            reject(err);
                        } else {
                            resolve(doc);
                        }
                    })
                } catch(err){
                    reject(err);
                }
                
            })
        }

    }
}

module.exports = user_experience;