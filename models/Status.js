const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for AdExpense
// The let statement declares a block scope local variable, optionally initializing it to a value.
// https://mongoosejs.com/docs/schematypes.html
let Status = new Schema(
    {
        code: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        collection: 'statuses'
    });

module.exports = mongoose.model('Status', Status);