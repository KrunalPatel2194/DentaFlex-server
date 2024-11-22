const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    clinicName: { type: String, required: true },
    date: { 
        type: Date, 
        required: true },
    time: { 
        type: String,
         required: true },
    role: { 
        type: String, 
        required: true },
    status: { 
        type: String, 
        default: 'Available' },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' },
})

module.exports = mongoose.model('Shift', shiftSchema);