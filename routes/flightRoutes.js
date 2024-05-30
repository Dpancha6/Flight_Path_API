const express = require("express");
const { calculateFlightPath } = require("../controllers/flightController");

const router = express.Router();

router.post("/", calculateFlightPath);

module.exports = router;
