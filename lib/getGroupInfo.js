/*

getGroupInfo.js - module for group info from Roblox
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: userId, Callback function (Required)
returns: groupInfoJSON, success

*/

const http = require("../util/http.js")

module.exports = function(groupId,callback){
    if (!groupId) throw new Error("groupId required");
    if (!callback) throw new Error("Callback function required");

    http(`https://groups.roblox.com/v1/groups/${groupId}`,"GET").then(function(response){
        if (response.Response.statusCode == 404){
            console.warn(`rapi/getGroupInfo.js: GroupId ${groupId} is invalid; Returned empty string`);
            callback({},false);
            return
        }

        if (response.Response.statusCode !== 200){
            throw new Error("Request failed with status: " + response.Response.statusCode);
        }

        callback(response.Body,true);
    })
}