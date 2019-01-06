const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for AdExpense
// The let statement declares a block scope local variable, optionally initializing it to a value.
// https://mongoosejs.com/docs/schematypes.html
let Expense = new Schema(
    {
        amount: {
            type: String
        },
        dateSpent: {
             type: Date
        },
        purpose: {
            type: String
        },
        category: {
            type: String
        },
        createdby:{
            type:String
        },
        lastupdateddate:{
            type: Date
        }

    },
    {
        collection: 'expenses'
    });

// Models are fancy constructors compiled from Schema definitions. 
// An instance of a model is called a document.Models are responsible for creating and reading documents from the underlying MongoDB database.
//https://mongoosejs.com/docs/models.html

module.exports = mongoose.model('Expense', Expense);