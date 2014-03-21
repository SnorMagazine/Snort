#!/bin/env node

// import the ShareJS server
var ShareJS = require('share').server;

var ShareJSOpts = {
  browserChannel: {
    cors: "*"
  },
  db: {
    type: "none"
  }
};

//  Express
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

ShareJS.attach(app, ShareJSOpts);




var server = function(){

var strt = this

strt.setupVariables = function() {
    strt.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    strt.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

    if (typeof strt.ipaddress === "undefined") {

        console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
        strt.ipaddress = "127.0.0.1";
    };
};




strt.createRoutes = function() {

app.use("/", express.static(__dirname + "/static"));
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/styles", express.static(__dirname + "/styles"));



}


strt.initializeServer = function() {

http.createServer(app).listen(strt.port, strt.ipaddress, function(){
  console.log('Express server listening on port ' + strt.port);
});



};

};

var Start = new server();

Start.setupVariables();
Start.createRoutes();
Start.initializeServer();









