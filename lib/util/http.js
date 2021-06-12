/*

http.js - module for easy http requests
author: diltz (https://github.com/Diltz)
date: 11.06.21
arguments: URL (Required), Method (Required), Headers, Body (Required if method POST)

*/

const request = require("request")

module.exports = function(URL,Method,Headers,Body){
    if (!URL) throw new Error("URL required");
    if (!Method) throw new Error("Method required");
    if (!Headers) {
        Headers = {
            "Content-Type": "application/json"
        }
    }

    Method = Method.toUpperCase();
    Headers["user-agent"] = `rapi/1.0`
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
                reject(new Error(error))
            }

            resolve({
                Response: response,
                Body: JSON.parse(body)
            })
        })
    })
}