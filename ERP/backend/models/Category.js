const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for AdExpense
// The let statement declares a block scope local variable, optionally initializing it to a value.
// https://mongoosejs.com/docs/schematypes.html
let Category = new Schema(
    {
        code: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        collection: 'categories'
    });

module.exports = mongoose.model('Category', Category);