const express = require('express');
const app = express();
const ExpenseRoutes = express.Router();

// Require Expense model in our routes module
let Expense = require('../models/Expense');

// Defined store route
ExpenseRoutes.route('/add').post(function (req, res) {
    let expense = new Expense(req.body);
    expense.save()
        .then(game => {
            res.status(200).json({ 'expense': 'expense has been added successfully' + expense });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add expense to database.");
        });
});
// Defined get data(index or listing) route
ExpenseRoutes.route('/').get(function (req, res) {
    Expense.find(function (err, Expenses) {
        if (err) {
            res.json(err);
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
            expense.status = req.body.status;

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
    Expense.findByIdAndRemove({ _id: req.params.id }, function (err, expense) {
        if (err) {
            res.json(err);
        }
        else res.json('Successfully removed');
    });
});

ExpenseRoutes.route('/getExpenseByCategory/:category').get(function (req, res) {
    Expense.find({ category: req.params.category }, function (err, expense) {
        if (err) {
            res.json(err);
        }
        res.json(expense);

    });
});

ExpenseRoutes.route('/bulkdelete/:itemsCount').get(function (req, res) {
    let itemCount = req.params.itemsCount;
    var removeIdsArray;

    Expense.find(query, fields, { skip: 10, limit: 5 }, function (err, results) {

        return res.json(expenses);
    });

});

ExpenseRoutes.route('/approve/:id').post(function (req, res) {
    Expense.findById(req.params.id, function (err, expense) {
        if (!expense)
            res.json(err);
        else {
            expense.status = "Approved";

            expense.save().then(expense => {
                res.json('Expense entry has been approved.');
            })
                .catch(err => {
                    res.status(400).send("Unable to approve express entry.");
                });
        }
    });
});

module.exports = ExpenseRoutes;