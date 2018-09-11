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
    debugger
    console.log("Inside auth");
    User.findOne({ username: req.body.username}, function (err, user) {
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

    //let filteredUsers = User.filter(user => {
    //    return user.username === request.body.username && user.password === request.body.password;
    //});

    //if (filteredUsers.length) {
    //    // if login details are valid return 200 OK with user details and fake jwt token
    //    let user = filteredUsers[0];
    //    let body = {
    //        id: user.id,
    //        username: user.username,
    //        firstName: user.firstName,
    //        lastName: user.lastName,
    //        token: 'fake-jwt-token'
    //    };
    //    return of(new HttpResponse({ status: 200, body: body }));
    //} else {
    //    // else return 400 bad request
    //    return throwError({ error: { message: 'Username or password is incorrect' } });
    //}
});

// Defined get data(index or listing) route
UserRoutes.route('/').get(function (req, res) {
    User.find(function (err, Expenses) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(Expenses);
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
            user.amount = req.body.amount;
            user.dateSpent = req.body.dateSpent;
            user.purpose = req.body.purpose;
            user.category = req.body.category;

            user.save().then(user => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
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
        else res.json('Successfully removed');
    });
});

module.exports = UserRoutes;