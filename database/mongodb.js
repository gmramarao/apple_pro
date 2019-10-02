var mongojs = require("mongojs");
"use strict";
class mongodb {
    constructor(...params){
        var mongojs = params[0];
        var config = params[1];
        this.db = mongojs(config.db, config.collections);

    }
}

module.exports = mongodb;