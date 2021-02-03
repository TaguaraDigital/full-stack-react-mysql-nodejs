require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3050;

const restaurantRoutes = require('./routes/restaurant.routes');

// Middlewares

app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', restaurantRoutes)

app.listen(port, () => { console.log(`Server running on port ${port}`)})