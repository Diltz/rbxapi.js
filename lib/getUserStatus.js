/*

getUserStatus.js - module for user status from Roblox profile
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: userId, Callback function (Required)
returns: userStatus, success

*/

const http = require("../util/http.js")

module.exports = function(userId,callback){
    if (!userId) throw new Error("userId cookie required");
    if (!callback) throw new Error("Callback function required");

    http(`https://users.roblox.com/v1/users/${userId}/status`,"GET").then(function(response){
        if (response.Response.statusCode == 400){
            console.warn(`rapi/getUserStatus.js: UserId ${userId} is invalid; Returned empty string`);
            callback("",false);
            return
        }

        if (response.Response.statusCode !== 200){
            throw new Error("Request failed with status: " + response.Response.statusCode);
        }

        callback(response.Body.status,true);
    })
}