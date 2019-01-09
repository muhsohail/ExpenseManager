const express = require('express');
const app = express();
const StatusRoutes = express.Router();

// Require Status model in our routes module
let Status = require('../models/Status');
let Expense = require('../models/Expense');

// Defined store route
StatusRoutes.route('/add').post(function (req, res) {
    let status = new Status(req.body);
    status.save()
        .then(game => {
            res.status(200).json({ 'status': 'status has been added successfully' + status });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add status to database.");
        });
});
// Defined get data(index or listing) route
StatusRoutes.route('/').get(function (req, res) {
    Status.find(function (err, Categories) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(Categories);
        }
    });
});

// Defined edit route
StatusRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Status.findById(id, function (err, status) {
        res.json(status);
    });
});
//  Defined update route
StatusRoutes.route('/update/:id').post(function (req, res) {
    Status.findById(req.params.id, function (err, status) {
        if (!status)
            res.json('Could not find existing document');
        else {
            status.code = req.body.code;
            status.description = req.body.description;

            status.save().then(status => {
                res.json('Status has been successfully updated.');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Delete
StatusRoutes.route('/delete/:id').post(function (req, res) {

    Status.findByIdAndRemove({ _id: req.params.id }, function (err, status) {
        if (err) {
            res.json(err);
        }
        else res.json('Status has been successfully removed');
    });

});

StatusRoutes.route('/bulkdelete/:itemsCount').get(function (req, res) {
    let itemCount = req.params.itemsCount;
    var removeIdsArray;

    Status.find(query, fields, { skip: 10, limit: 5 }, function (err, results) {

        return res.json(categories);
    });
});

module.exports = StatusRoutes;