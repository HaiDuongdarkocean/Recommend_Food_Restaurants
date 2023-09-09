const fs = require("fs");

const express = require("express");
const path = require("path");

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

app.get('/restaurants/:id', (req, res) => { 
  const restaurantId = req.params.id;
  res.render("restaurant-detail", { rid: restaurantId});
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  
  /** parse json to JavaScripts text */
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  /** stringify JavaScripts text to json */
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

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

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});