const express = require('express');
const app = express();
const CategoryRoutes = express.Router();

// Require Category model in our routes module
let Category = require('../models/Category');

// Defined store route
CategoryRoutes.route('/add').post(function (req, res) {
    let category = new Category(req.body);
    category.save()
        .then(game => {
            res.status(200).json({ 'category': 'category has been added successfully' + category });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add category to database.");
        });
});
// Defined get data(index or listing) route
CategoryRoutes.route('/').get(function (req, res) {
    Category.find(function (err, Categories) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(Categories);
        }
    });
});

CategoryRoutes.route('/getAllNotCommon').get(function (req, res) {
    Category.find({isCommon: false}, function (err, Categories) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(Categories);
        }
    });
});


// Defined edit route
CategoryRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Category.findById(id, function (err, category) {
        res.json(category);
    });
});
//  Defined update route
CategoryRoutes.route('/update/:id').post(function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (!category)
            res.json('Could not load document');
        else {
            category.code = req.body.code;
            category.description = req.body.datdescriptioneSpent;

            category.save().then(category => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
// Delete
CategoryRoutes.route('/delete/:id').post(function (req, res) {
    Category.findByIdAndRemove({ _id: req.params.id }, function (err, category) {
        if (err) {
            res.json(err);
        }
        else res.json('Successfully removed');
    });
});

CategoryRoutes.route('/bulkdelete/:itemsCount').get(function (req, res) {
    let itemCount = req.params.itemsCount;
    var removeIdsArray;

    Category.find(query, fields, { skip: 10, limit: 5 }, function (err, results) {

        return res.json(categories);
    });
});

module.exports = CategoryRoutes;