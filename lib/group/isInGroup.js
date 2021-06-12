/*

isInGroup.js
author: diltz (https://github.com/Diltz)
date: 12.06.21
arguments: groupId, userId
returns: promise

*/

const http = require("../util/http.js")
const getGroupRoles = require("./getGroupRoles.js")
const getCSRFtoken = require("../auth/getCSRFtoken.js")