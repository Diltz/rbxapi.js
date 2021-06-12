/*

getUserInfo.js - module for user status from Roblox profile
author: diltz (https://github.com/Diltz)
date: 11.06.21
modified: 12.06.21
arguments: userId
returns: userInfoJSON

*/

const http = require("../util/http.js")

module.exports = function(userId){
    if (!userId) throw new Error("userId required");

    return new Promise((resolve,reject) => {
        http(`https://users.roblox.com/v1/users/${userId}`,"GET").then(function(response){
            if (response.Response.statusCode == 404){
                reject(new Error("User not found"))
                return
            }
    
            if (response.Response.statusCode !== 200){
                reject(new Error("Request failed with status: " + response.Response.statusCode))
            }
    
            resolve(response.Body)
        })
    
    })
}