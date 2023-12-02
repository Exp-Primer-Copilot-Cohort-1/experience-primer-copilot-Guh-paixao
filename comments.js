//create web server
var express = require('express');
var app = express();

//set port
var port = process.env.PORT || 8080;

//set static files (css and images) location
app.use(express.static(__dirname + '/public'));

//start app and listen on port
app.listen(port, function(){
  console.log('App listening on port ' + port);
});