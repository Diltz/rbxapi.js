/*

getCSRFtoken.js - module for getting CSRF token from Roblox
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: .ROBLOSECURITY (Required)
returns: csrf-token, success

*/

const http = require("../util/http.js")

module.exports = function(token){
    if (!token) throw new Error(".ROBLOSECURITY cookie required");

    return new Promise((resolve,reject) => {
        http("https://auth.roblox.com/v1/logout","POST",{
            "Content-Type": "application/json",
            "Cookie": ".ROBLOSECURITY=" + token
        }).then(function(response){
            if (response.Response.statusCode !== 403){
                reject(new Error("Something wrong with request; Status: " + response.Response.statusCode))
                return
            }
    
            if (!response.Response.headers["x-csrf-token"]){
                reject(new Error("Failed getting CSRF Token"))
                return
            }
    
            resolve(response.Response.headers["x-csrf-token"],true)
        })
    })
}