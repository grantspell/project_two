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
const CelebrantModel = Schema.CelebrantModel;
const PrintCardModel = Schema.PrintCardModel;
const ECardModel = Schema.ECardModel;

// DELETE ALL USERS FROM DB
UserModel.remove({}, function (error) {
    console.log(error);
});

// EXISTING USERS
const grant = new UserModel({ name: 'Grant', username: 'GrantSpell', email: 'SpellGrant@gmail.com' })
const miley = new UserModel({ name: 'Miley', username: 'MileyCyrus', email: 'MalibuBarbie@gmail.com' })
const june = new UserModel({ name: 'June', username: 'JuneCash', email: 'RingOfFireWidow@hotmail.com' })

// EXISTING CELEBRANTS
const celebrantViv = new CelebrantModel({ firstName: 'Viv', lastName: 'Spell', age: 50, birthDate: '1968-09-29' })

// EXISTING PRINT CARDS
const birthdayCard = new PrintCardModel({ cardName: 'Vivs Birthday', message: 'Happy Birthday, Mom!', type: 'PRINT' })

// EXISTING eCARDS
const welcomeCard = new ECardModel({ cardName: 'Welcome', message: 'Welcome Home, Honey!', type: 'eCARD' })

// ASSIGN CARDS TO USERS
const users = [grant, miley, june]
const celebrants = [celebrantViv]
const printCards = [birthdayCard]
const eCards = [welcomeCard] 

eCards.forEach((eCard) => {
    
    eCard.celebrants = celebrants

    eCard.save()
        .then((eCard) => {
            console.log(`${eCard.cardName} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })

})

printCards.forEach((printCard) => {
    
    printCard.celebrants = celebrants

    printCard.save()
        .then((printCard) => {
            console.log(`${printCard.cardName} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

users.forEach((user) => {

    user.printCards = printCards
    user.eCards = eCards

    user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

db.close();