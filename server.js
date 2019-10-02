"use strict";
var express = require("express");
var app = express();
var body_parser = require("body-parser");
var mongojs = require("mongojs");
var morgan = require("morgan");
var expressValidator = require("express-validator");
var jwt = require("jsonwebtoken");
var config = require("./config/index");
var databse = require("./database/mongodb");
var routing = require("./routing/index");
config = new config();
var db = new databse(mongojs, config).db;
var controllers = require("./controllers/index");
var ctrl = new controllers(db, jwt);
var router = new routing(express, app, db, ctrl, jwt);
app.use(body_parser.json());
app.use(morgan("dev"));
app.use(expressValidator());
app.get("/test", (req, res)=>{
    res.json("hello i am calling");
})
app.use("/api", router.api);
app.listen(config.port);
console.log("server running on port number : ", config.port);
