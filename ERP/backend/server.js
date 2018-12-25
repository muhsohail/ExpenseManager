const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);
const adUnitRoutes = require('./routes/adexpense.route');
const expenseRoutes = require('./routes/expense.route');
const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/adunits', adUnitRoutes);
app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);


const server = app.listen(port, function () {
    console.log('Hello, I am listening to the port ' + port);
});