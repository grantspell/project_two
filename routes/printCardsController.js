const express = require('express')
const router = express.Router()

const Schema = require('../db/schema.js')

const UserModel = Schema.UserModel
const PrintCardModel = Schema.PrintCardModel

// INDEX ROUTE
router.get('/', (req, res) => {

    PrintCardModel.find({})
        .then((printcards) => {
            res.render('printCards/index', {
                printcards: printcards
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// SHOW ROUTE
router.get('/:printCardId', (req, res) => {

        const printCardId = req.params.printCardId
    
        PrintCardModel.findById(printCardId)
            .then((printcard) => {
                res.render('printcards/show', {
                    printcard: printcard
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })

module.exports = router