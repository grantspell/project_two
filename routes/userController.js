const express = require('express')
const router = express.Router()

const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel

// INDEX ROUTE
router.get('/', (req, res) => {

    UserModel.find({})
        .then((user) => {
            res.render('user/index', {
                users: users
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW ROUTE


// CREATE ROUTE


// EDIT ROUTE


// UPDATE ROUTE


// SHOW ROUTE


// DELETE ROUTE


module.exports = router