/*

getUserStatus.js - module for user status from Roblox profile
author: diltz (https://github.com/Diltz)
date: 11.06.21
modified: 12.06.21
arguments: userId
returns: userStatus

*/

const http = require("../util/http.js")

module.exports = function(userId){
    if (!userId) throw new Error("userId required");

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

    return new Promise((resolve,reject) => {
        http(`https://users.roblox.com/v1/users/${userId}/status`,"GET").then(function(response){
            if (response.Response.statusCode == 400){
                reject(new Error("User not found"))
                return
            }
    
            if (response.Response.statusCode !== 200){
                reject(new Error("Request failed with status: " + response.Response.statusCode))
                return
            }
    
            callback(response.Body.status,true);
        })
    })
}