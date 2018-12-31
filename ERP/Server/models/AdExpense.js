const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdExpense
let AdExpense = new Schema({
  amount: {
    type: String
  },
  purpose: {
    type: String
  }
},{
    collection: 'adexpenses'
});

module.exports = mongoose.model('AdExpense', AdExpense);