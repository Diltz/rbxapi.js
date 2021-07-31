/*

index.js
author: diltz
date: 12.06.21
comment: set up all functions

*/

const root = __dirname
var exports = module.exports

// auth

exports.getCSRFtoken = require(root + "/lib/auth/getCSRFtoken.js")

// group

exports.getGroup = require(root + "/lib/group/getGroup.js")
exports.getGroupRoles = require(root + "/lib/group/getGroupRoles.js")
exports.getRankInGroup = require(root + "/lib/group/getRankInGroup.js")
exports.getRoleInGroup = require(root + "/lib/group/getRoleInGroup.js")
exports.isInGroup = require(root + "/lib/group/isInGroup.js")
exports.setRank = require(root + "/lib/group/setRank.js")
exports.setGroupStatus = require(root + "/lib/group/setGroupStatus.js")
exports.setGroupShout = exports.setGroupStatus

// user

exports.getCurrentUser = require(root + "/lib/user/getCurrentUser.js")
exports.getUser = require(root + "/lib/user/getUser.js")
exports.getUserStatus = require(root + "/lib/user/getUserStatus.js")
exports.getUserIdByUsername = require(root + "/lib/user/getUserIdByUsername.js")
exports.getUsernamebyId = require(root + "/lib/user/getUsernamebyId.js")

// util

exports.util = {}
exports.util.http = require(root + "/lib/util/http.js")