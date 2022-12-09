const roblox = require("./index.js")
const get = require("./lib/group/getUserGroups.js")
const cookie = ""

/*
roblox.setRank(cookie,2824810,192226872,253).then(function(){
    console.log("Success!")
}).catch(console.error)*/

//roblox.setGroupStatus(cookie,2824810,"test")

get(192226872).then(result => {
    console.log(result)
})