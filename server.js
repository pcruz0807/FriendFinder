var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


// Configure Express

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('app/public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes

require(".app/routing/apiRoutes.js")(app);
require(".app/routing/htmlRoutes.js")(app);

// Listener

app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});