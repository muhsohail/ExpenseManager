const express = require('express');
const app = express();
const SettlementRoutes = express.Router();

// Require Settlement model in our routes module
let Settlement = require('../models/Settlement');

// Defined store route
SettlementRoutes.route('/add').post(function (req, res) {
    let settlement = new Settlement(req.body);
    settlement.save()
        .then(game => {
            res.status(200).json({ 'settlement': 'settlement has been added successfully' + settlement });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add settlement to database.");
        });
});
// Defined get data(index or listing) route
SettlementRoutes.route('/').get(function (req, res) {
    Settlement.find(function (err, Settlements) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(Settlements);
        }
    });
});
// Defined edit route
SettlementRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Settlement.findById(id, function (err, settlement) {
        res.json(settlement);
    });
});
//  Defined update route
SettlementRoutes.route('/update/:id').post(function (req, res) {
    Settlement.findById(req.params.id, function (err, settlement) {
        if (!settlement)
            console.log('Could not load document');
        else {
            settlement.amount = req.body.amount;
            settlement.settlementdate = req.body.settlementdate;
            settlement.by = req.body.by;

            settlement.save().then(settlement => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
// Delete
SettlementRoutes.route('/delete/:id').post(function (req, res) {
    Settlement.findByIdAndRemove({ _id: req.params.id }, function (err, settlement) {
        if (err) {
            res.json(err);
        }
        else res.json('Successfully removed');
    });
});

SettlementRoutes.route('/bulkdelete/:itemsCount').get(function (req, res) {
    let itemCount = req.params.itemsCount;
    var removeIdsArray;

    Settlement.find(query, fields, { skip: 10, limit: 5 }, function (err, results) {

        return res.json(settlements);
    });
});

module.exports = SettlementRoutes;