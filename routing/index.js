"use strict";
class routing {
    constructor(...params){
        var express = params[0];
        var app = params[1];
        var db = params[2];
        var controller = params[3];
        var login = controller.login;
        var register = controller.register;
        var user_experience = controller.user_experience;
        var jwt = params[4];
        this.api = express.Router();

        this.api.post("/register", (req, res)=>{
            var data = req.body;
            req.checkBody("name", "name is required").notEmpty();
            req.checkBody("user_name", "user_name is required").notEmpty();
            req.checkBody("password", "password is required").notEmpty();
            req.asyncValidationErrors().then(() => {
                try {
                    register.signup(data).then((response)=>{
                        console.log(response);
                        make_response(res, 200, true, "Succesfully registered", response);
                    }).catch((err)=>{
                        make_response(res, 500, false, "Something went wrong", err);
                    })
                } catch (err){
                    make_response(res, 500, false, "Something went wrong", err);
                }
                
            }).catch((err)=>{
                make_response(res, 400, false, "request params not found", err);
            })
            
        })


        this.api.post("/login", (req, res)=>{
            var data = req.body;
            console.log(data);
            req.checkBody("user_name", "user_name is required").notEmpty();
            req.checkBody("password", "password is required").notEmpty();
            req.asyncValidationErrors().then(()=>{
                try {
                    login.signin(data).then((response)=>{
                        make_response(res, 200, true, "Succesfully login", response);
                    }).catch((err)=>{
                        make_response(res, 500, false, "Something went wrong", err);
                    })
                } catch(err) {
                    make_response(res, 500, false, "Something went wrong", err);
                }
            }).catch((err)=>{
                make_response(res, 400, false, "request params not found", err);
            })
            
        })

        this.api.use((req, res, next)=>{
            var token = req.body.token || req.query.token || req.headers.token;
            var user_name = req.body.user_name || req.query.user_name || req.headers.user_name;
            try {
                if(token && user_name) {
                    jwt.verify(token, 'secret', (err, decoded)=>{
                        if(err){
                            make_response(res, 500, false, "Something went wrong", err);
                        } else {
                            if(decoded){
                                if(decoded.user_name == user_name){
                                    next();
                                } else {
                                    make_response(res, 400, false, "Token not matched", "Token not matched with user_name");
                                }
                            } else {
                                make_response(res, 400, false, "Token not valid", "Token not valid or expired");
                            }
                            
                        }
                    })
                } else {
                    make_response(res, 400, false, "request params not found", "user_name, token required fields");
                }
                
            } catch(err){
                console.log(err);
                make_response(res, 500, false, "Something went wrong", err);
            }
            
        })
        
        this.api.post("/add_user_experience", (req, res)=>{
            var data = req.body;
            console.log(data);
            req.checkBody("user_name", "user_name is required").notEmpty();
            req.checkBody("company", "company is required").notEmpty();
            req.checkBody("years_of_experience", "years_of_experience is required").notEmpty();
            req.asyncValidationErrors().then(()=>{
                try {
                    user_experience.add_experience(data).then((response)=>{
                        make_response(res, 200, true, "Succesfully inserted", response);
                    }).catch((err)=>{
                        console.log(err);
                        make_response(res, 500, false, "Something went wrong", err);
                    })
                } catch(err){
                    console.log(err);
                    make_response(res, 500, false, "Something went wrong", err);
                }
                
            }).catch((err)=>{
                console.log(err);
                make_response(res, 400, false, "request params not found", err);
            })
        })

        this.api.get("/get_user_experience/:user_name/:token", (req, res)=>{
            var data = {
                user_name : req.params.user_name
            }
            try {
                user_experience.get_experience(data).then((response)=>{
                    make_response(res, 200, true, "Succesfully getting data", response);
                }).catch((err)=>{
                    console.log(err);
                    make_response(res, 500, false, "Something went wrong", err);
                })
            } catch(err){
                console.log(err);
                make_response(res, 500, false, "Something went wrong", err);
            }
        })

        this.api.delete("/delete_user_experience/:user_name/:company/:token", (req, res)=>{
            var data = {
                user_name : req.params.user_name,
                company : req.params.company
            }
            console.log(data);
            try {
                user_experience.delete_experience(data).then((response)=>{
                    make_response(res, 200, true, "Succesfully deleted", response);
                }).catch((err)=>{
                    console.log(err);
                    make_response(res, 500, false, "Something went wrong", err);
                })
            } catch(err){
                console.log(err);
                make_response(res, 500, false, "Something went wrong", err);
            }
        })

        this.api.put("/update_user_experience", (req, res)=>{
            var data = req.body;
            console.log(data);
            req.checkBody("user_name", "user_name is required").notEmpty();
            req.checkBody("company", "company is required").notEmpty();
            req.checkBody("years_of_experience", "years_of_experience is required").notEmpty();
            req.asyncValidationErrors().then(()=>{
                try {
                    user_experience.update_experience(data).then((response)=>{
                        make_response(res, 200, true, "Succesfully updated", response);
                    }).catch((err)=>{
                        console.log(err);
                        make_response(res, 500, false, "Something went wrong", err);
                    })
                } catch(err){
                    console.log(err);
                    make_response(res, 500, false, "Something went wrong", err);
                }
                
            }).catch((err)=>{
                console.log(err);
                make_response(res, 400, false, "request params not found", err);
            })
        })

    }

    
}

function make_response(...params){
    params[0].status(params[1]).send({
        "Success": params[2],
        "Status": params[1],
        "Message": params[3],
        "Result": params[4]
    });
    
}

module.exports = routing;