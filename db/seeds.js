require('dotenv').config();

// DATABASE SETUP
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

// ERROR LOGGER
db.on('error', function (error) {
    console.log(error);
});

db.once('open', function () {
    console.log('=DB(seeds)= CONNECTED TO MONGO DATABASE =(seeds)DB=');
}) 

// REQUIRE SCHEMAS
const Schema = require('./schema.js');

const UserModel = Schema.UserModel;
const PrintCardModel = Schema.PrintCardModel;
const ECardModel = Schema.ECardModel;

// DELETE ALL USERS FROM DB
UserModel.remove({}, function (error) {
    console.log(error);
});

// EXISTING USERS
const john = new UserModel({ name: 'John Wayne', username: 'TrueGrit1959', email: 'StrongMaleLead@gmail.com' })
const jared = new UserModel({ name: 'Jared French', username: 'JaredFrench', email: 'jared@me.com' })
const dali = new UserModel({ name: 'Salvador Dali', username: 'Surrealism101', email: 'MeltingTimeClock@gmail.com' })

// EXISTING PRINT CARDS
const birthdayCard = new PrintCardModel({ cardName: 'Vivs Birthday', image: "URL HERE" })

// EXISTING eCARDS
const welcomeCard = new ECardModel({ cardName: 'Welcome', toPerson: "John", fromPerson: "Me", message: "Happy Birthday, Johnny Boy!" })

// ASSIGN CARDS TO USERS
const users = [john, jared, dali]
const printCards = [birthdayCard]
const eCards = [welcomeCard] 

eCards.forEach((eCard) => {

    eCard.save()
        .then((eCard) => {
            console.log(`${eCard.cardName} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })

})

printCards.forEach((printCard) => {

    printCard.save()
        .then((printCard) => {
            console.log(`${printCard.cardName} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

users.forEach((user) => {

    user.userPrintCards = printCards
    user.userECards = eCards

    user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

db.close();