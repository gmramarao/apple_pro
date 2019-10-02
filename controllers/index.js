"use strict";
var login = require("./login");
var register = require("./register");
var user_experience = require("./user_experience");
class index {
    constructor(...params){
        var db = params[0];
        var jwt = params[1];
        this.login = new login(db, jwt);
        this.register = new register(db);
        this.user_experience = new user_experience(db);

    }
}

module.exports = index;