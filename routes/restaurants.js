const express = require("express");

const uuid = require("uuid");
const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/restaurants/:id", (req, res) => {
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

router.get("/restaurants", (req, res) => {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoreRestaurants();

  storedRestaurants.sort((resA, resB) => {
    if (order === "asc" && resA.name > resB.name) {
      return -1;
    }
    return 1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.post("/recommend", (req, res) => {
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

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

module.exports = router;
