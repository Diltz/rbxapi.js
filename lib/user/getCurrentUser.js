/*

getCurrentUser.js - module for getting current authenticated user
author: diltz (https://github.com/Diltz)
date: 11.06.21
modified: 12.06.21
arguments: .ROBLOSECURITY (Required)
returns: CurrentUser

*/

const http = require("../util/http.js")

module.exports = function(token){
    if (!token) throw new Error(".ROBLOSECURITY cookie required");

    return new Promise((resolve,reject) => {
        http("https://users.roblox.com/v1/users/authenticated","GET",{
            "Cookie": ".ROBLOSECURITY=" + token
        }).then(function(response){
            if (response.Response.statusCode !== 200){
                reject(new Error("Request failed with status: " + response.Response.statusCode))
                return
            }
    
            resolve(response.Body)
        })
    })
}