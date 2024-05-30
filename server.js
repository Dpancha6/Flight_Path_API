const express = require("express");
const bodyParser = require("body-parser");
const flightRoutes = require("./routes/flightRoutes");
const path = require("path");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/calculate", flightRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
  console.log(`Flight path API listening on port ${port}`);
});

module.exports = app; // Export the app for testing purposes
