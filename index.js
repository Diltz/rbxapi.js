/*

    @author Diltz

*/

const fs = require("fs")

scan = (path) => {
    let files = fs.readdirSync(path, {encoding: "utf-8"})
    
    files.forEach((value, index) => {
        let executable = require(`${path}/${value}`)
        let method = value.split(".")[0]

        module.exports[method] = executable
    })
}

scan(__dirname + "/lib/auth")
scan(__dirname + "/lib/group")
scan(__dirname + "/lib/user")
scan(__dirname + "/lib/util")