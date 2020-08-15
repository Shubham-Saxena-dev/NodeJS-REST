const path = require('path')
const express = require('express');
const Joi = require('@hapi/joi');

var file = require('fs')

const router = express.Router();

var filePath = path.join(__dirname, '../userDetails.json')

const schemaValidation = Joi.object({
    name: Joi.string().min(3).optional(),
    password: Joi.string().min(6).optional(),        // Joi.string().regex(/[a-zA-Z0-9]{3,30}/) .required()
    profession: Joi.string().min(4).optional()
});

router.put("/updateUser/:id", (req, res) => {
    const { error } = schemaValidation.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    file.readFile(filePath, (err, data) => {
        if (err) {
            throw err
        }
        let parsedData = JSON.parse(data)
        let allUsers = parsedData["users"]
      let user = getUser(allUsers, req.params.id)
        if (!user) {
            res.status(200).send("User not found")
            return
        }
        updateUserInJsonFile(user, req)
        file.writeFile(filePath, JSON.stringify(parsedData, 0, 4), (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send("User updated successfully " + JSON.stringify(user, 0, 4))
        })
    })
})

updateUserInJsonFile = (user, req) => {
    if (user) {
        let reqBody = req.body
        if (reqBody.name) {
            user.name = reqBody.name
        }
        if (reqBody.password) {
            user.password = reqBody.password
        } if (reqBody.profession) {
            user.profession = reqBody.profession
        }
    }
}

getUser = (allUsers, id) => {
    allUsers = allUsers[0]
    let indexedUser = null
    Object.values(allUsers).forEach(function (user) {
        if (user.id === parseInt(id)) {
            indexedUser = user
        }
    })
    return indexedUser
}

module.exports = router