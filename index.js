// imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// initiated the application
const app = express();

// Using Dependencies
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Enable EJS layouts
app.use(expressLayouts);

// Specify the layout files. Add all the layout files in the parameter of the set method.
app.set('layout', 'layouts/main');

// Set the public directory. This is where the static files are stored.
app.use(express.static(path.join(__dirname, 'public')));


// Add routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
