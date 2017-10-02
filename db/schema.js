const mongoose = require('mongoose');

// SCHEMAS
const Schema = mongoose.Schema;

//PRINT CARDS
const PrintCardSchema = new Schema({
    cardName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

//iCARDS
const ECardSchema = new Schema({
    cardName: {
        type: String,
        required: true
    },
    toPerson: {
        type: String,
        required: true
    },
    fromPerson: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

//USERS
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userECards: [ECardSchema]
});

// MODELS
const UserModel = mongoose.model('User', UserSchema)
const PrintCardModel = mongoose.model('PrintCard', PrintCardSchema)
const ECardModel = mongoose.model('eCard', ECardSchema)

// EXPORTS
module.exports = {
    UserModel: UserModel,
    PrintCardModel: PrintCardModel,
    ECardModel: ECardModel
}