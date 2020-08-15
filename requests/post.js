const path = require('path')
const express = require('express');
const Joi = require('@hapi/joi');

var file = require('fs')

const router = express.Router();

var filePath = path.join(__dirname, '../userDetails.json')


const schemaValidation = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),        // Joi.string().regex(/[a-zA-Z0-9]{3,30}/) .required()
    profession: Joi.string().min(4).required()
});
let storeUser = null;

router.post('/', (req, res) => {
    let filedata = null
    const { error } = schemaValidation.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    let newUser = {
        name: req.body.name,
        password: req.body.password,
        profession: req.body.profession
    }
    file.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
        filedata = JSON.parse(data)
        let allUsers = filedata["users"];
        addUserToJsonFile(allUsers, newUser)
        filedata["users"] = allUsers
        file.writeFile(filePath, JSON.stringify(filedata, 0, 4), (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send("User added successfully "+ JSON.stringify(storeUser, 0, 4))
        })
    })
})

addUserToJsonFile = (allUsers, newUser) => {
    allUsers = allUsers[0]
    let indexedUser = null
    newUser.id = Object.values(allUsers)[Object.values(allUsers).length - 1].id + 1
    allUsers["user" + newUser.id] = newUser
    storeUser = newUser
}


module.exports = router;