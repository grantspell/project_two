const express = require('express')
const router = express.Router()

const Schema = require('../db/schema.js')

const UserModel = Schema.UserModel
const PrintCardModel = Schema.PrintCardModel
const ECardModel = Schema.ECardrModel

// INDEX ROUTE
router.get('/', (req, res) => {

    const userId = req.params.userId

    UserModel.findById(userId)
        .then((user) => {
            res.render('cards/index', {
                user: user
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