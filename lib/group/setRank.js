/*

setRank.js
author: diltz (https://github.com/Diltz)
date: 12.06.21
arguments: .ROBLOSECURITY, groupId, userId, roleid / rank
returns: promise

*/

const http = require("../util/http.js")
const getGroupRoles = require("./getGroupRoles.js")
const getCSRFtoken = require("../auth/getCSRFtoken.js")

module.exports = function(cookie,groupId,userId,roleid) {
    if (!cookie) throw new Error("cookie required");
    if (!groupId) throw new Error("groupId required");
    if (!userId) throw new Error("userId required");
    if (!roleid) throw new Error("roleid/rank required");

    return new Promise((resolve,reject) => {
        if (roleid === 255) {
            reject(new Error("Rank argument can't be 255"))
            return
        }

        getGroupRoles(groupId).then(async function(roles){
            let n_roleid = null

            await roles.forEach((value,index) => {
                if (value.rank == roleid || value.id == roleid) {
                    n_roleid = value.id
                    return
                }

                if (index + 1 === roles.length && !n_roleid) {
                    reject(new Error("Rank not found!"))
                    return
                }
            })

            if (!n_roleid) return;

            getCSRFtoken(cookie).then(function(token){
                http(`https://groups.roblox.com/v1/groups/${groupId}/users/${userId}`,"PATCH",{
                    "x-csrf-token": token,
                    "Cookie": ".ROBLOSECURITY=" + cookie,
                    "content-type": "application/json"
                },{
                    roleId: n_roleid
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

        }).catch(function(){
            reject(new Error("Group doesn't exist"))
        })
    })
}