var http = require('http');
var path = require('path');
var fs = require('fs');

var express = require('express');

var app = express();
var server = http.createServer(app);

// Settings
var PORT = process.argv[2] ? parseInt(process.argv[2], 10) : 4000;
var TARGET = process.argv[3] || 'src';
var ROOT_DIR = __dirname;
var PUBLIC_DIR = path.join(ROOT_DIR, '' + TARGET);

// Parsing
app.use(express.bodyParser());
app.use(express.cookieParser());

// Static files
app.use(express.static(PUBLIC_DIR));

// Fallback to index.html
app.use(function (req, res) {

	fs.readFile(path.join(PUBLIC_DIR, 'index.html'), 'utf8', function (err, data) {
		if (!err) {
			res.status(200).send(data);
		}
		else {
			res.status(500).send(err);
		}
	});
});

// Start
server.listen(PORT);
console.log('Web server listening on port %d', PORT);
console.log('Public directory: %s', PUBLIC_DIR);
