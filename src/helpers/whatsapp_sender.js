#!/usr/bin/env node
var http = require('http');
const fs = require('fs')
var instanceId = process.env.WHATMATE_INSTANTID;
var clientId = process.env.WHATMATE_CLIENTID;
var clientSecret = process.env.WHATMATE_CLIENT_SECRET;

module.exports.sendMessage = function(message){
    var jsonPayload = JSON.stringify({
        group_admin: process.env.WHATSAPP_ADMIN_NUMBER,
        group_name: process.env.WHATSAPP_ADMIN_NAME,
        message: message
    });
    
    var options = {
        hostname: "api.whatsmate.net",
        port: 80,
        path: "/v3/whatsapp/group/text/message/" + instanceId,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WM-CLIENT-ID": clientId,
            "X-WM-CLIENT-SECRET": clientSecret,
            "Content-Length": Buffer.byteLength(jsonPayload)
        }
    };
    var request = new http.ClientRequest(options);
    
    request.end(jsonPayload);
    
    request.on('response', function (response) {
        console.log('Heard back from the WhatsMate WA Gateway:\n');
        console.log('Status code: ' + response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
        });
    });    
}