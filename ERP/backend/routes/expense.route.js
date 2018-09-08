// adexpense.route.js

const express = require('express');
const app = express();
const ExpenseRoutes = express.Router();

// Require AdExpense model in our routes module
let Expense = require('../models/Expense');

// Defined store route
ExpenseRoutes.route('/add').post(function (req, res) {
    let expense = new Expense(req.body);
    expense.save()
        .then(game => {
            res.status(200).json({ 'expense': 'expense in added successfully' });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add expense to database.");
        });
});
// Defined get data(index or listing) route
ExpenseRoutes.route('/').get(function (req, res) {
    Expense.find(function (err, Expenses) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(Expenses);
        }
    });
});
// Defined edit route
ExpenseRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Expense.findById(id, function (err, expense) {
        res.json(expense);
    });
});

//  Defined update route
ExpenseRoutes.route('/update/:id').post(function (req, res) {
    Expense.findById(req.params.id, function (err, expense) {
        if (!expense)
            console.log('Could not load document');
        else {
            expense.amount = req.body.amount;
            expense.dateSpent = req.body.dateSpent;
            expense.purpose = req.body.purpose;
            expense.category = req.body.category;

            expense.save().then(expense => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Delete
ExpenseRoutes.route('/delete/:id').post(function (req, res) {
    console.log('Called');
    Expense.findByIdAndRemove({ _id: req.params.id }, function (err, expense) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else res.json('Successfully removed');
    });
});


module.exports = ExpenseRoutes;