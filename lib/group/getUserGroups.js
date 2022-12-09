// https://groups.roblox.com/v2/users/192226872/groups/roles

/*
    @author Diltz
*/

const superagent = require("superagent")

module.exports = async (userId) => {
    console.log(userId)
    let response
    
    try {
        response = await superagent.get(`https://groups.roblox.com/v2/users/${userId}/groups/roles`)
    } catch (error) {
        throw error.status
    }

    return response.body.data
}