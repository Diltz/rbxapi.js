/*

getGroup.js
author: diltz (https://github.com/Diltz)
date: 11.06.21
modified: 12.06.21
arguments: groupId
returns: promise

*/

const http = require("../util/http.js")

module.exports = function(groupId){
    if (!groupId) throw new Error("groupId required");

    return new Promise((resolve,reject)=>{
        http(`https://groups.roblox.com/v1/groups/${groupId}`,"GET").then(function(response){
            if (response.Response.statusCode == 400){
                reject(new Error("Group with provided groupId not found"))
                return
            }
    
            if (response.Response.statusCode !== 200){
                if (response.Response.statusCode === 403){
                    reject(new Error(`You are unauthorized to perform this request; Message: ${response.Response.statusMessage}`))
                    return
                }

                reject(new Error(`Roblox returned HTTP: ${response.Response.statusCode}; Message: ${response.Response.statusMessage}`))
                return
            }
    
            resolve(response.Body)
        })
    })
}