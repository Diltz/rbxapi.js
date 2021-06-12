/*

getGroupInfo.js - module for group info from Roblox
author: diltz (https://github.com/Diltz)
date: 11.06.21
modified: 12.06.21
arguments: userId
returns: groupInfoJSON

*/

const http = require("../util/http.js")

module.exports = function(groupId){
    if (!groupId) throw new Error("groupId required");

    return new Promise((resolve,reject) => {
        http(`https://groups.roblox.com/v1/groups/${groupId}`,"GET").then(function(response){
            if (response.Response.statusCode == 400){
                reject(new Error("Group not found"))
                return
            }
    
            if (response.Response.statusCode !== 200){
                reject(new Error("Request failed with status: " + response.Response.statusCode))
                return
            }
    
            resolve(response.Body,true);
        })
    })
}