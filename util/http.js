/*

http.js - module for easy http requests
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: URL (Required), Method (Required), Headers, Body (Required if method POST)

usage example:

let reqHeaders = {
    "Content-Type": "application/json"
}

let reqBody = {
    "Test1": "Test1",
    "Test21": "Test2"
}

http("https://example.com","POST",reqHeaders,reqBody).then(function(httpres){
    console.log(httpres.Response.headers)
})

*/

const request = require("request")
const package_file = require("../package.json")

module.exports = function(URL,Method,Headers,Body){
    if (!URL) throw new Error("URL required");
    if (!Method) throw new Error("Method required");
    if (!Headers) {
        Headers = {
            "Content-Type": "application/json"
        }
    }

    Method = Method.toUpperCase();
    Headers["user-agent"] = `rapi/${package_file.version}`
    Body = Body || {}

    if (Method === "POST" && !Body){
        throw new Error("Method POST requires a body");
    }

    return new Promise((resolve,reject)=>{
        let Options = {
            method: Method,
            headers: Headers,
            body: JSON.stringify(Body) || "{}"
        }

        request(URL,Options,function(error,response,body){
            if (!body) {
                body = "{}"
            }

            if (error) {
                throw new Error(error);
            }

            resolve({
                Response: response,
                Body: JSON.parse(body)
            })
        })
    })
}