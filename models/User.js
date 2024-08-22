const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // email : {
    //     type: String,
    // },
    // phone : {
    //     type: String,
    // },
    // unit: {
    //     type: String,
    // },
    // street: {
    //     type: String,
    // },
    // city: {
    //     type: String,
    // },
    // state: {
    //     type: String,
    // },
    // country : {
    //     type: String,
    // },
    // zipcode : {
    //     type: String
    // },
    // marketingEmails : {
    //     type: Boolean
    // }
});

module.exports = mongoose.model('User', UserSchema);