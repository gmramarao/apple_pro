"use strict";
class config  {
    constructor(){
        this.port = 7777,
        this.db = "rest-task",
        this.collections = ["users", "user_experience"];
    }
}

module.exports = config;