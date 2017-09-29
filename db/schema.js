const mongoose = require('mongoose');

// SCHEMAS
const Schema = mongoose.Schema;

// CELEBRANT
const CelebrantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    birthDate: {
        type: Date,
        default: Date.now
    }
});

//PRINT CARDS
const PrintCardSchema = new Schema({
    cardName: {
        type: String,
        required: true
    },
    celebrant: [CelebrantSchema],
    message: {
        type: String,
        required: false
    },
    type: {
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
    celebrant: [CelebrantSchema],
    message: {
        type: String,
        required: false
    },
    type: {
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
    userPrintCards: [PrintCardSchema],
    userECards: [ECardSchema]
});

// MODELS
const UserModel = mongoose.model('User', UserSchema)
const CelebrantModel = mongoose.model('Celebrant', CelebrantSchema)
const PrintCardModel = mongoose.model('Print', PrintCardSchema)
const ECardModel = mongoose.model('eCard', ECardSchema)

// EXPORTS
module.exports = {
    UserModel: UserModel,
    CelebrantModel: CelebrantModel,
    PrintCardModel: PrintCardModel,
    ECardModel: ECardModel
}