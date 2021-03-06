const mongoose = require('../db/mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid"
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },

    tokens: [{
        auth: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = {User}