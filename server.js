
// start up
var express = require('express');
var app = express();
var http = require('http').Server(app);
var server = http;
app.set('port', (process.env.PORT || 3333));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(request, response) {
	response.sendFile('pirata2.html', {
		root : __dirname
	});
});
app.get('*', function(request, response) {
	response.sendFile('404.html', {
		root : __dirname
	});
});
http.listen(app.get('port'), function() {
	console.log('listening on ' + app.get('port'));
});