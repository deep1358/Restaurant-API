# Restaurant Management API

Welcome to the Restaurant Management API repository! This project provides backend services for managing restaurants, including CRUD operations (Create, Read, Update, Delete) and search functionalities.

## Features
- **GET /api/restaurants**: Retrieve a list of all restaurants.
- **POST /api/restaurants**: Add a new restaurant.
- **PUT /api/restaurants/:id**: Update an existing restaurant by ID.
- **DELETE /api/restaurants/:id**: Delete a restaurant by ID.

## Technologies Used
- Node.js
- Express.js
- dotenv (for environment variables)
- CORS (for cross-origin resource sharing)

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Ensure you have the following installed on your local machine:
- Node.js
- npm

### Installation
Clone the repository:

```bash
git clone https://github.com/yourusername/Restaurant-API.git
```

### Navigate into the project directory:

Install dependencies:

```bash
npm install
```

### Configuration
Create a .env file in the root directory of the project and add the following environment variables:

```plaintext
PORT=5000
DATA_FILE_PATH=./data/restaurants.json
FRONTEND_URL=http://localhost:5173
```

### Running the Application
To run the application locally, use the following command:

```bash
npm run dev
```
This will start the server at http://localhost:5173.

## API Endpoints
**GET /api/restaurants**

Retrieve a list of all restaurants.

**POST /api/restaurants**

Add a new restaurant.

Request body example:

```json
{
  "name": "Restaurant Name",
  "description": "Restaurant Description",
  "area": "Restaurant Area",
  "city": "Restaurant City",
  "capacity": 50,
  "rating": 4.5,
  "cuisine": "Restaurant Cuisine",
  "image": "https://example.com/restaurant-image.jpg"
}
```

**PUT /api/restaurants/:id**

Update an existing restaurant by ID.

Request body example (update any fields):

```json
{
  "name": "Updated Restaurant Name"
}
```

**DELETE /api/restaurants/:id**

Delete a restaurant by ID.

## Usage
Once the server is running, you can use the API endpoints to manage restaurants:

Use tools like Postman or curl to interact with the API endpoints.
Integrate the API with a frontend application for a complete restaurant management solution.

## Restaurant UI:-

[https://github.com/deep1358/Restaurant-UI](https://github.com/deep1358/Restaurant-UI)