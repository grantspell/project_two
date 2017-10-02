const express = require('express')
const router = express.Router({ mergeParams: true })

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
            user.userECards.push(newECard)
            return user.save()
        })
        .then((user) => {
            res.redirect(`/users/${userId}/eCards`)
        })
})

// EDIT ROUTE
router.get('/:eCardsId/edit', (req, res) => {

    const userId = req.params.userId
    const eCardId = req.params.eCardId

    UserModel.findById(userId)
        .then((user) => {
            const eCard = user.userECards.id(eCardId)

            res.render('eCards/edit', {
                eCard: eCard,
                userId: userId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE ROUTE
router.put('/:eCardId', (req, res) => {

    const userId = req.params.userId
    const eCardId = req.params.eCardId
    const updatedECard = req.body

    UserModel.findById(userId)
        .then((user) => {
            const eCard = user.userECards.id(eCardId)

            userECard.cardName = updatedECard.cardName
            userECard.toPerson = updatedECard.toPerson
            userECard.fromPerson = updatedECard.fromPerson
            userECard.message = updatedECard.message

            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/eCards/${eCardId}`)
        })
})

// SHOW ROUTE
router.get('/:eCardId', (req, res) => {

    const userId = req.params.userId
    const eCardId = req.params.eCardId

    UserModel.findById(userId)
        .then((user) => {
            const eCard = user.userECards.id(eCardId)

            res.render('eCards/show', {
                eCard: eCard,
                userId: userId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE ROUTE
router.get('/:eCardId/delete', (req, res) => {

    const userId = req.params.userId
    const eCardId = req.params.eCardId

    UserModel.findById(userId)
        .then((user) => {
            const eCard = user.userECards.id(eCardId).remove()

            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/eCards`)
        })
})

module.exports = router