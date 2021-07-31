/*

getUsernamebyId.js - module for getting userid by username
author: diltz (https://github.com/Diltz)
date: 31.07.21
arguments: id
returns: username

*/

const http = require("../util/http.js")

module.exports = function(userId){
    if (!userId) throw new Error("userId required");

    return new Promise((resolve,reject) => {
        http(`https://users.roblox.com/v1/users/${userId}`,"GET").then(function(response){
            response = response.Response
            let body = JSON.parse(response.body)

            if (response.statusCode == 404){
                return reject(new Error("User not found"))
            }
    
            if (response.statusCode !== 200){
                return reject(new Error("Request failed with status: " + response.statusCode))
            }
    
            resolve(body.name)
        })
    })
}