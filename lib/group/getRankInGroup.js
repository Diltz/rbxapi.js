/*

getRankInGroup.js
author: diltz (https://github.com/Diltz)
date: 12.06.21
arguments: userId, groupId
returns: promise

*/

const http = require("../util/http.js")

module.exports = function(userId,groupId) {
    if (!userId) throw new Error("userId required");
    if (!groupId) throw new Error("groupId required");

    return new Promise((resolve,reject) => {
        http(`https://groups.roblox.com/v1/users/${userId}/groups/roles`,"GET").then(function(Response){
            if (Response.Response.statusCode !== 200) {
                reject(new Error(Response.Body.errors[0].message))
            } else {
                let isExist = Response.Body.data.find(info => info.group.id === groupId)
                
                if (isExist) {
                    resolve(isExist.role.rank)
                } else {
                    resolve(0)
                }
            }
        })
    })
}