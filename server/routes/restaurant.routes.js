const express = require("express");
const dbConnection = require("../database/connections");
const router = express.Router();
const controller = require("../controllers/restaurant.controllers")


// Get all Restaurants
router.get("/api/v1/restaurants", controller.restaurants);

// Get a Restaurant by Id
router.get("/api/v1/restaurants/:id", controller.restaurantById);

// Add a Restaurant
router.post("/api/v1/restaurants", controller.createRestaurant);

// Update a Restaurant
router.put("/api/v1/restaurants/:id", controller.updateRestaurant);

// Delete a Restaurant
router.delete("/api/v1/restaurants/:id", controller.deleteRestaurant);

/*================= REVIEWS =========================*/

// Add a Review
router.post("/api/v1/restaurants/:id/review", controller.addReview);


/*================= pruebas =========================*/

// Add a Review
router.post("/test", controller.test);


module.exports = router;