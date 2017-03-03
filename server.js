var port = 5518;
var express = require('express');
var mongoose = require('mongoose');
var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./config/db');








var app = express();




app.use('/', mainRouter);
app.use('/api', apiRouter);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public/statics'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(db.url);





app.listen(port);
console.log('Server is running');