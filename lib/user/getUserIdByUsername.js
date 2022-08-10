/*

getUserIdByUsername.js - module for getting userid by username
author: diltz (https://github.com/Diltz)
date: 31.07.21
arguments: username
returns: id

*/

const http = require("../util/http.js")

module.exports = function(username){
    if (!username) throw new Error("username required");

    return new Promise((resolve,reject) => {
        http(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=10`,"GET").then(function(response){
            response = response.Response
            let body = JSON.parse(response.body)
    
            if (response.statusCode !== 200){
                return reject(new Error("Request failed with status: " + response.statusCode))
            }

            if (!body.data[0]) {
                return resolve()
            }

            resolve(body.data[0].id)
        })
    
    })
}