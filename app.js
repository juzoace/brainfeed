

const express = require("express");
const bodyParser = require("body-parser");

// Initialize the application
const app = express();

// Create an instance of the app
const fs = require('fs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes.js")(app, fs);

const server = app.listen(3001, () => {
    console.log("Application listening on port %s...", server.address().port);
})


