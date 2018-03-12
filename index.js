const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUnitialized: true,
    secret: config.secret
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(config.port, function () {
    console.log('Server run on the port ' + config.port);
});
