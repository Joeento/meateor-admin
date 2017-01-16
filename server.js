'use strict';

var express    = require('express');
var path    = require('path');
var app        = express();
var bodyParser = require('body-parser');

var url = require('url');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

var port = process.env.PORT || 3000;


var router = express.Router();


router.get('/', function(req, res) {
	res.send('hello!');
});


app.use('/api', router);

app.use(express.static(__dirname + '/app'));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(port);
console.log('Magic happens on port ' + port);