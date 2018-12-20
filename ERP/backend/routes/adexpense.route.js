// adexpense.route.js

const express = require('express');
const app = express();
const adExpenseRoutes = express.Router();


// Require AdExpense model in our routes module
let AdExpense = require('../models/AdExpense');

// Defined store route
adExpenseRoutes.route('/add').post(function (req, res) {
  let adExpense = new AdExpense(req.body);
  adExpense.save()
    .then(game => {
    res.status(200).json({'adExpense': 'AdExpense in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
adExpenseRoutes.route('/').get(function (req, res) {
    AdExpense.find(function (err, adExpenses){
    if(err){
      console.log(err);
    }
    else {
      res.json(adExpenses);
    }
  });
});

// Defined edit route
adExpenseRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  AdExpense.findById(id, function (err, adExpense){
      res.json(adExpense);
  });
});

//  Defined update route
adExpenseRoutes.route('/update/:id').post(function (req, res) {
    AdExpense.findById(req.params.id, function(err, adExpense) {
    if (!adExpense)
      return next(new Error('Could not load Document'));
    else {
        adExpense.unit_name = req.body.unit_name;
        adExpense.unit_price = req.body.unit_price;

        adExpense.save().then(adExpense => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
adExpenseRoutes.route('/delete/:id').get(function (req, res) {
    AdExpense.findByIdAndRemove({_id: req.params.id}, function(err, adExpense){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = adExpenseRoutes;