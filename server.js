var express = require('express');

const bodyParser = require('body-parser');

var PORT = process.env.PORT || 3307;

var app = express();

// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
var routes = require('./controllers/burgers_controller.js');

app.use(routes);

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});