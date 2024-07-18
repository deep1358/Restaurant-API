const fs = require('fs').promises;

/**
 * Reads JSON data from a file.
 * @param {string} dataFilePath - The file path to read JSON data from.
 * @returns {Promise<Array>} - A promise that resolves with an array of objects parsed from JSON.
 */
const readDataFile = async (dataFilePath) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

/**
 * Writes JSON data to a file.
 * @param {Array} data - The data to write (an array of objects).
 * @param {string} dataFilePath - The file path to write JSON data to.
 * @returns {Promise<void>} - A promise that resolves when the data is successfully written.
 */
const writeDataFile = async (data, dataFilePath) => {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data file:', error);
    }
};

/**
 * Validates a restaurant object.
 * @param {object} restaurant - The restaurant object to validate.
 * @param {boolean} [isCreation=true] - Indicates if the validation is for a new restaurant creation (default true).
 * @returns {boolean} - Returns true if the restaurant object is valid, otherwise false.
 */
const isValidRestaurant = (restaurant, isCreation = true) => {
    // Basic validations for required fields during creation
    if (isCreation && (!restaurant.name || !restaurant.description || !restaurant.area || !restaurant.city || !restaurant.image)) {
        return false;
    }

    // Type and format validations for all fields
    if (restaurant.name && typeof restaurant.name !== 'string') {
        return false;
    }
    if (restaurant.description && typeof restaurant.description !== 'string') {
        return false;
    }
    if (restaurant.area && typeof restaurant.area !== 'string') {
        return false;
    }
    if (restaurant.city && typeof restaurant.city !== 'string') {
        return false;
    }
    if (restaurant.image && typeof restaurant.image !== 'string') {
        return false;
    }
    if (restaurant.capacity && (isNaN(restaurant.capacity) || restaurant.capacity <= 0)) {
        return false;
    }
    if (restaurant.rating && (isNaN(restaurant.rating) || restaurant.rating < 0 || restaurant.rating > 5)) {
        return false;
    }
    if (restaurant.cuisine && typeof restaurant.cuisine !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    readDataFile,
    writeDataFile,
    isValidRestaurant
}