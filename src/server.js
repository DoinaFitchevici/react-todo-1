const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Replace with your Airtable base details
const API_BASE_URL = "https://api.airtable.com/v0/";
const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN; // Ensure this is set in your server environment, not in React

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

// Proxy endpoint for fetching todos from Airtable
app.get("/api/todos", async (req, res) => {
  const url = `${API_BASE_URL}${AIRTABLE_BASE_ID}/${TABLE_NAME}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
