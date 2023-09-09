/**
 * PACKAGE:
 * uuid: uniform unique ID.
 */

const fs = require("fs");

const express = require("express");
const uuid = require("uuid");
const path = require("path");

const resData = require("./util/restaurant-data");

const app = express();

/** static: checks if a request for static file && pass name of the folder in project */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/** set path to make expressjs understood where file to views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoreRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurantId === restaurant.id) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  /** 404 page: not found */
  res.status(404).render("404");
});

app.get("/restaurants", (req, res) => {
  const storedRestaurants = resData.getStoreRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;

  /** randomly generated id, guaranteed to be unique */
  restaurant.id = uuid.v4();
  console.log(restaurant);

  const storedRestaurants = resData.getStoreRestaurants();
  storedRestaurants.push(restaurant);

  /** stringify JavaScripts text to json */
  storedDataRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

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
