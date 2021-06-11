/*

getCurrentUser.js - module for getting current authenticated user
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: .ROBLOSECURITY (Required), Callback function (Required)
returns: CurrentUser, success

*/

const http = require("../util/http.js")

module.exports = function(token,callback){
    if (!token) throw new Error(".ROBLOSECURITY cookie required");
    if (!callback) throw new Error("Callback function required");

    http("https://users.roblox.com/v1/users/authenticated","GET",{
        "Cookie": ".ROBLOSECURITY=" + token
    }).then(function(response){
        if (response.Response.statusCode !== 200){
            throw new Error("Request failed with status: " + response.Response.statusCode)
        }

        callback(response.Body,true)
    })
}