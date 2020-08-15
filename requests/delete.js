const path = require('path')
const express = require('express');
const Joi = require('@hapi/joi');

var file = require('fs')

const router = express.Router();

var filePath = path.join(__dirname, '../userDetails.json')

router.delete("/deleteUser/:id", (req, res) => {
    file.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
        filedata = JSON.parse(data)
        let allUsers = filedata["users"]
        let userKey = getUserKey(allUsers, req.params.id)
        if (!userKey) {
            res.status(200).send("User not found")
            return
        }

        delete allUsers[0][userKey]

        file.writeFile(filePath, JSON.stringify(filedata, 0, 4), (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send("User deleted successfully" + JSON.stringify(filedata, 0, 4))
        })
    })
})

getUserKey = (allUsers, id) => {
    allUsers = allUsers[0]
    let indexedUser = null
    Object.values(allUsers).forEach(function (user) {
        if (user.id === parseInt(id)) {
            indexedUser = user
        }
    })
    return Object.keys(allUsers).find(key => allUsers[key] === indexedUser);
}

module.exports = router
