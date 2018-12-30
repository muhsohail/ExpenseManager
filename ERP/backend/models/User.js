const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for User
// The let statement declares a block scope local variable, optionally initializing it to a value.
// https://mongoosejs.com/docs/schematypes.html

let User = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String
        },
        percentage:{
            type: Number
        }
    },
    {
        collection: 'users'
    });

// Models are fancy constructors compiled from Schema definitions. 
// An instance of a model is called a document.Models are responsible for creating and reading documents from the underlying MongoDB database.
//https://mongoosejs.com/docs/models.html

module.exports = mongoose.model('User', User);