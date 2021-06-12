/*

setGroupStatus.js
author: diltz (https://github.com/Diltz)
date: 12.06.21
arguments: cookie, groupId, status
returns: promise

*/

const http = require("../util/http.js")
const getCSRFtoken = require("../auth/getCSRFtoken.js")

module.exports = function(cookie,groupId,status) {
    if (!cookie) throw new Error("Cookie required");
    if (!groupId) throw new Error("groupId required");
    if (!status) throw new Error("status required");

    return new Promise((resolve,reject) => {
        getCSRFtoken(cookie).then(function(token){
            http(`https://groups.roblox.com/v1/groups/${groupId}/status`,"PATCH",{
                "x-csrf-token": token,
                "Cookie": ".ROBLOSECURITY=" + cookie,
                "content-type": "application/json"
            },{
                message: status.toString()
            }).then(function(response){
                if (response.Response.statusCode !== 200) {
                    reject(new Error(response.Body.errors[0].message))
                } else {
                    resolve(true)
                }
            })
        }).catch(()=>{
            reject(new Error("Failed getting CSRF"))
        })
    })
}