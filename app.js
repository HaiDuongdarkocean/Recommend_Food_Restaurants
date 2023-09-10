/**
 * PACKAGE:
 * uuid: uniform unique ID.
 */

const express = require("express");
const path = require("path");

const defaultRoutes = require('./routes/default');
const  restaurantRoutes = require('./routes/restaurants');

const app = express();

/** static: checks if a request for static file && pass name of the folder in project */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/** set path to make expressjs understood where file to views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

/** 404 page: not found */
app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});
