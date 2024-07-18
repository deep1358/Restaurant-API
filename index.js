const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { readDataFile, writeDataFile, isValidRestaurant } = require('./utils');

const app = express();

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000
const dataFilePath = process.env.DATA_FILE_PATH || './data/restaurants.json'; // Use DATA_FILE_PATH from environment variables or default path
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000'; // Default frontend URL

// Middleware
app.use(bodyParser.json());

// Custom CORS configuration to allow only frontend URL
const corsOptions = {
  origin: frontendURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods
};
app.use(cors(corsOptions)); // Enable CORS for specific frontend URL

// Routes

/**
 * Route to fetch all restaurants
 * Method: GET
 * Endpoint: /api/restaurants
 * @returns {Array} An array of restaurants
 */
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await readDataFile(dataFilePath);
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Route to add a new restaurant
 * Method: POST
 * Endpoint: /api/restaurants
 * @param {object} req.body - The restaurant data to be added
 * @returns {object} The newly added restaurant object
 */
app.post('/api/restaurants', async (req, res) => {
  try {
    const restaurant = req.body;

    // Validate input using isValidRestaurant function
    if (!isValidRestaurant(restaurant)) {
      return res.status(400).json({ error: 'Invalid restaurant data' });
    }

    const restaurants = await readDataFile(dataFilePath);
    const newRestaurant = {
      id: restaurants.length + 1,
      name: restaurant.name,
      description: restaurant.description,
      area: restaurant.area,
      city: restaurant.city,
      image: restaurant.image,
      capacity: parseInt(restaurant.capacity) || null,
      rating: parseFloat(restaurant.rating) || null,
      cuisine: restaurant.cuisine || null,
    };

    restaurants.push(newRestaurant);
    await writeDataFile(restaurants, dataFilePath);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Route to modify a restaurant by ID
 * Method: PUT
 * Endpoint: /api/restaurants/:id
 * @param {string} req.params.id - The ID of the restaurant to modify
 * @param {object} req.body - The updated restaurant data
 * @returns {object} The updated restaurant object
 */
app.put('/api/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  const restaurantUpdates = req.body;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid restaurant ID' });
  }

  // Validate restaurant updates
  if (!isValidRestaurant(restaurantUpdates, false)) {
    return res.status(400).json({ error: 'Invalid restaurant data' });
  }

  // Convert capacity and rating to numbers if provided
  if (restaurantUpdates.capacity) {
    restaurantUpdates.capacity = parseInt(restaurantUpdates.capacity);
  }

  if (restaurantUpdates.rating) {
    restaurantUpdates.rating = parseFloat(restaurantUpdates.rating);
  }

  try {
    let restaurants = await readDataFile(dataFilePath);
    const index = restaurants.findIndex((restaurant) => restaurant.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Update only the fields that are provided in restaurantUpdates
    restaurants[index] = {
      ...restaurants[index],
      ...restaurantUpdates,
    };

    await writeDataFile(restaurants, dataFilePath);
    res.json(restaurants[index]);
  } catch (error) {
    console.error('Error modifying restaurant:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Route to delete a restaurant by ID
 * Method: DELETE
 * Endpoint: /api/restaurants/:id
 * @param {string} req.params.id - The ID of the restaurant to delete
 * @returns {undefined}
 */
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }

    let restaurants = await readDataFile(dataFilePath);
    restaurants = restaurants.filter((restaurant) => restaurant.id !== parseInt(id));
    await writeDataFile(restaurants, dataFilePath);
    res.sendStatus(204); // No content in response for successful deletion
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
