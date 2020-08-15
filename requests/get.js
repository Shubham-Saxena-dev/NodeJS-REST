const path = require('path')
const express = require('express');
var file = require('fs')

const router = express.Router();

var filePath = path.join(__dirname, '../userDetails.json')

router.get('/getAllUsers', (req, res) => {
    file.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
        res.status(200).send(JSON.stringify(JSON.parse(data), 0, 4))
    })
});

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

router.get('/getUser/:id', (req, res) => {
    file.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
        const parsedData = JSON.parse(data);
        let userData = null;
        let allUsers = parsedData["users"];
        userData = getUser(allUsers, req.params.id)
        if (userData)
            res.status(200).send(JSON.stringify(userData,0,4))
        else
            res.status(404).send("Not Found")
    }
    )
    {/*  Another way of doing
        let keys = Object.keys(parsedData);
         keys.map(key => {
            let oneKey = parsedData[key]["id"];
            if (oneKey === parseInt(req.params.id))
                userData = parsedData[key];
        })*/}

});

module.exports = router;