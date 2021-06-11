/*

getCSRFtoken.js - module for getting CSRF token from Roblox
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: .ROBLOSECURITY (Required), Callback function (Required)
returns: csrf-token, success

*/

const http = require("../util/http.js")

module.exports = function(token,callback){
    if (!token) throw new Error(".ROBLOSECURITY cookie required");
    if (!callback) throw new Error("Callback function required");

    http("https://auth.roblox.com/v1/logout","POST",{
        "Content-Type": "application/json",
        "Cookie": ".ROBLOSECURITY=" + token
    }).then(function(response){
        if (response.Response.statusCode !== 403){
            throw new Error("Something wrong with request; Status: " + response.Response.statusCode)
        }

        if (!response.Response.headers["x-csrf-token"]){
            throw new Error("Failed getting CSRF Token")
        }

        callback(response.Response.headers["x-csrf-token"],true)
    })
}