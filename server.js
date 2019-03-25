console.log('server is starting...');

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listening);

function listening() {
    console.log('listening...');
}

app.use(express.static('public'));