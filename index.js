/*

 npm/rbxapi.js
 index.js
 author: diltz (https://github.com/Diltz)
 date: 12.06.21

*/

const fs = require("fs")
const lib_path = "./lib"
var auth_path = lib_path + "/auth"
var group_path = lib_path + "/group"
var user_path = lib_path + "/user"

fs.readdirSync(auth_path).forEach((value,index) => {
    let file = value.split(".")[0]
    module.exports[file] = require(auth_path + "/" + value)
})

fs.readdirSync(group_path).forEach((value,index) => {
    let file = value.split(".")[0]
    module.exports[file] = require(group_path + "/" + value)
})

fs.readdirSync(user_path).forEach((value,index) => {
    let file = value.split(".")[0]
    module.exports[file] = require(user_path + "/" + value)
})