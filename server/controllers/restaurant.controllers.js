const dbConnection = require('../database/connections');
const controller = {};

// Get all Restaurants
controller.restaurants =  async (req, res) => {
    try {
      // const restaurantData = await dbConnection.query("select * from restaurants", (err, result) => {
      const restaurantData = await dbConnection.query("select * from restaurants left join (select restaurant_id, COUNT(*) AS count, TRUNCATE(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id", (err, result) => {
        if (err) {
          res.status(400).json({
            status: 400,
            success: false,
            message: err.sqlMessage
          })
          return;
        }
        res.status(200).json({
          status: 200,
          success: true,
          data : result,
          message: "ok"
        })
      })
    } catch (err) {
      console.log(err);
    }
};

// Get a Restaurant by Id
controller.restaurantById = async (req, res) => {
  const rest_id = req.params.id;
  let salida = {};

  try {
    // const restaurant = await dbConnection.query(`select * from restaurants where id = ${rest_id}`, (err, result) => {
    const restaurant = await dbConnection.query(`SELECT * FROM restaurants
      LEFT JOIN (
          SELECT restaurant_id, COUNT(*) AS count, TRUNCATE(AVG(rating),1) AS average_rating FROM reviews
          GROUP BY restaurant_id)
          reviews ON restaurants.id = reviews.restaurant_id WHERE id = ${rest_id}`, (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }
        console.log('resultado parcial', result[0])
        
      if (result[0]) {
        salida = {
          status: 200,
          success: true,
          data: result,
          message: "ok"
        }
      } else {
        res.status(404).json({
          status: 404,
          success: true,
          data: result,
          message: "restauran no found"
        })
        return;
      }
    })

    const reviews = await dbConnection.query(`SELECT * FROM reviews   WHERE restaurant_id = ${rest_id}`, (err1, result1) => {
      res.status(200).json({
        status: 200,
        success: true,
        data: {
          restaurant: salida.data,
          reviews: result1
        }
      })
    })
  
  } catch (err) {
    console.log(err);
  }
};

// Create a Restaurant
controller.createRestaurant = async (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;

  try {
    const createRestaurant = await dbConnection.query("INSERT INTO restaurants (name, location, price_range) VALUE( ?, ? ,? )", [name, location, price_range ], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: "ok"
      })
    })
    } catch (err) {
        console.log(err);
      }
};

// Update a Restaurant
controller.updateRestaurant = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;

  try {
    const updateRestaurant = await dbConnection.query(`UPDATE restaurants SET name = ?, location = ?, price_range = ? WHERE id=?`, [name, location, price_range, id ], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }

      if (result.affectedRows !== 0) {
          res.status(200).json({
          status: 200,
          success: true,
          data: result,
          message: "ok"
        })
      } else {
        res.status(404).json({
          status: 404,
          success: true,
          data: result,
          message: "restauran no found"
        })
      }
    })
    } catch (err) {
        console.log(err);
      }
};

// Delete a Restaurant
controller.deleteRestaurant = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteRestaurant = await dbConnection.query(`DELETE FROM restaurants WHERE id=?`, [id ], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }
      
      if (result.affectedRows !== 0) {
        res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: "ok"
      })
    } else {
      res.status(404).json({
        status: 404,
        success: true,
        data: result,
        message: "restauran no found"
      })
    }
    })
    } catch (err) {
        console.log(err);
      }
};


// =============== Reviews ===================

// Add Review
controller.addReview = async (req, res) => {

  const rest_id = req.params.id;
  const name = req.body.name;
  const review = req.body.review;
  const rating = req.body.rating;

  try {
    const createRestaurant = await dbConnection.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (?, ?, ?, ?)", [rest_id, name, review, rating ], (err, result) => {
      if (err) {
        res.status(400).json({
          status: 400,
          success: false,
          message: err.sqlMessage
        })
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        message: "ok"
      })
    })
    } catch (err) {
        console.log(err);
      }
};



// =============== TEST  Eliminar antes de pasar a produccion ===================
controller.test = async (req, res) => {
  let salida = {
    salida: "ok",
    resultado: "nada"
  }
  try {
    const test1 = await dbConnection.query('SELECT * FROM restaurants WHERE id = 11', function (error, results, salida) {
      if (error) throw error;
      res.status(200).json({
        status: 200,
        success: true,
        results: results,
        message: "ok",
 
      })
    });

  } catch (err) {
    console.log(err);
  }
};

module.exports = controller;