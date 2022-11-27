const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    aadhar_number: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
});

const User_Detail = mongoose.model('users_details', userSchema); 
module.exports = User_Detail;