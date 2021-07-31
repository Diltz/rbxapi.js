/*

getUserInfo.js - module for user status from Roblox profile
author: diltz (https://github.com/Diltz)
date: 11.06.21
modified: 31.07.21
arguments: userId
returns: userInfoJSON

*/

const http = require("../util/http.js")

module.exports = function(userId){
    if (!userId) throw new Error("userId required");

    return new Promise((resolve,reject) => {
        http(`https://users.roblox.com/v1/users/${userId}`,"GET").then(function(response){
            response = response.Response

            if (response.statusCode == 404){
                return reject(new Error("User not found"))
            }
    
            if (response.statusCode !== 200){
                return reject(new Error("Request failed with status: " + response.statusCode))
            }
    
            resolve(response.Body)
        })
    
    })
}