'use strict';

var express    = require('express');
var path    = require('path');
var app        = express();
var bodyParser = require('body-parser');

var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var url = require('url');
var cheerio = require('cheerio');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

var port = process.env.PORT || 3000;


var router = express.Router();
/* TODO:
 * Handle yelp photo pagination
 * Handle repeat photos
 */

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
var request_yelp = function(set_parameters, callback) {

		/* The type of request */
	var httpMethod = 'GET';

	/* The url we are using for the request */
	var url = 'http://api.yelp.com/v2/search';

	/* We can setup default parameters here */
	var default_parameters = {
		location: 'Merrick',
		sort: '2'
	};

		/* We set the require parameters here */
	var required_parameters = {
		oauth_consumer_key : 'csdi7F36hri2nUuaThDl-A',
		oauth_token : 'vqhResGOIrAZ8EeXAWjOysxgh71EtWsx',
		oauth_nonce : n(),
		oauth_timestamp : n().toString().substr(0,10),
		oauth_signature_method : 'HMAC-SHA1',
		oauth_version : '1.0'
	};

		/* We combine all the parameters in order of importance */
	var parameters = _.assign(default_parameters, set_parameters, required_parameters);

	/* We set our secrets here */
	var consumerSecret = '144rceddI0ZhzLMR9NMFwTx5qQU';
	var tokenSecret = 'AOFFNT6qcOh-D82qxMNl2pjp3yY';

	/* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
	/* Note: This signature is only good for 300 seconds after the oauth_timestamp */
	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

	/* We add the signature to the list of paramters */
	parameters.oauth_signature = signature;

	/* Then we turn the paramters object, to a query string */
	var paramURL = qs.stringify(parameters);

	/* Add the query string to the url */
	var apiURL = url+'?'+paramURL;

	/* Then we use request to send make the API Request */
	request(apiURL, function(error, response, body){
		return callback(error, response, body);
	});

};

router.get('/restaurants', function(req, res) {
	request_yelp({}, function(error, response, body) {
		if (error) {
			res.send({
				'error': true,
				'message': 'Unable to find any restaurants.'
			});
			return;
		}
		var businesses = JSON.parse(body).businesses;
		res.send(businesses);
	});
});

router.get('/photo/:restarurantId', function(req, res) {
	var photos_url = 'https://www.yelp.com/biz_photos/' + req.params.restarurantId;
	request(photos_url, function(photos_error, photos_response, photos_html){
        if(photos_error){
			res.send({
				'error': true,
				'message': 'Unable to get photos'
			});
			return;
        }

        var $ = cheerio.load(photos_html);

        /*
        $('.photo-box-grid li').each(function(key, val) {
			console.log($(val).attr('data-photo-id'));
        });
		*/

		var photo_id = $('.photo-box-grid li').attr('data-photo-id');
		var photo_url = 'https://www.yelp.com/biz_photos/' + req.params.restarurantId + '?select=' + photo_id;
		request(photo_url, function(photo_error, photo_response, photo_html){
			if(photo_error){
				res.send({
					'error': true,
					'message': 'Unable to get photo caption.'
				});
				return;
			}
			var $ = cheerio.load(photo_html);

			res.send({
				id: photo_id,
				yelp_url: photo_url,
				photo_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/' + photo_id + '/o.jpg',
				caption: $('.selected-photo-caption-text').text().replace(/^\n[ ]+|[ ]*\n[ ]+$/g,'')
			});
		});

		

        
    });
});

router.post('/photo', function(req, res) {
	
});


app.use('/api', router);

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(port);
console.log('Magic happens on port ' + port);