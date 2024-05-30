const calculateFlightPath = (req, res) => {
  let { flights } = req.body;

  if (!flights || typeof flights !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Sanitize the input to replace single quotes with double quotes
    flights = flights.replace(/'/g, '"');

    // Log the sanitized input for debugging purposes
    // console.log("Sanitized input:", flights);

    // Parse the sanitized string to JSON
    const flightsArray = JSON.parse(flights);

    // Validate the array format
    if (
      !Array.isArray(flightsArray) ||
      !flightsArray.every((item) => Array.isArray(item) && item.length === 2)
    ) {
      throw new Error("Invalid flight data format");
    }

    const departureSet = new Set();
    const destinationSet = new Set();

    flightsArray.forEach(([source, destination]) => {
      departureSet.add(source);
      destinationSet.add(destination);
    });

    // Find the starting point: a departure not present in destinations
    const start = [...departureSet].find((city) => !destinationSet.has(city));
    // Find the end point: a destination not present in departures
    const end = [...destinationSet].find((city) => !departureSet.has(city));

    const flightPath = [start, end];

    // Log the calculated flight path for debugging purposes
    // console.log("Calculated flight path:", flightPath);

    res.json({ flightPath });
  } catch (error) {
    console.error("Error processing flight data:", error);
    res.status(400).json({ error: "Error processing flight data" });
  }
};

module.exports = { calculateFlightPath };
