// user.route.js
const express = require('express');
const app = express();
const UserRoutes = express.Router();

// Require User model in our routes module
let User = require('../models/User');

// Defined store route
UserRoutes.route('/register').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(game => {
            res.status(200).json({ 'user': 'user in added successfully' });
        })
        .catch(err => {
            res.status(400).send("An error has occurred. Unable to add user to database.");
        });
});

UserRoutes.route('/authenticate').post(function (req, res) {

    console.log("Inside auth");
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) {
            return throwError({ error: { message: 'Username or password is incorrect' } });
            console.log("Inside auth error");
        }
        else {
            console.log("Inside auth not error");
            let body = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            };
            res.json(user);
        }
    });
});

// Defined get data(index or listing) route
UserRoutes.route('/').get(function (req, res) {
    User.find(function (err, User) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(User);
        }
    });
});

UserRoutes.route('/GetUsersForDashboard').get(function (req, res) {
    User.find({}, '-password', function (err, User) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(User);
        }
    });
});

// Defined edit route
UserRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

//  Defined update route
UserRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            console.log('Could not load document');
        else {
            user.firstName = req.body.firstname;
            user.lastName = req.body.lastname;
            user.username = req.body.username;
            user.role = req.body.role;
            user.password = req.body.password;
            user.percentage = req.body.percentage;


            user.save().then(user => {
                res.json('User has been successfully updated in the database');
            })
                .catch(err => {
                    res.status(400).send("Whoops, something went wrong.");
                });
        }
    });
});

// Delete
UserRoutes.route('/delete/:id').post(function (req, res) {
    console.log('Called');
    User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else res.json('User has been successfully removed from the system.');
    });
});


module.exports = UserRoutes;