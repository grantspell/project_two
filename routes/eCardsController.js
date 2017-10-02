const express = require('express')
const router = express.Router()

const Schema = require('../db/schema.js')

const UserModel = Schema.UserModel
const ECardModel = Schema.ECardrModel

// INDEX ROUTE
router.get('/', (req, res) => {

    const userId = req.params.userId

    UserModel.findById(userId)
        .then((user) => {
            res.render('eCards/index', {
                user: user
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW ROUTE
router.get('/new', (req, res) => {

    const userId = req.params.userId

    res.render('eCards/new', {
        userId: userId
    })

})

// CREATE ROUTE
router.post('/', (req, res) => {

    const userId = req.params.userId
    const newECard = req.body

    UserModel.findById(userId)
        .then((user) => {
            user.eCards.push(newECard)
            return user.save()
        })
        .then((user) => {
            res.redirect(`/users/${userId}/eCards`)
        })
})

// EDIT ROUTE


// UPDATE ROUTE


// SHOW ROUTE


// DELETE ROUTE


module.exports = router