const router = require("express").Router();

const lotController = require("../controllers/lotController");
const parkController = require("../controllers/parkController");

router.get("/test", (req, res) => {
  res.json({ status: "success" });
});

router.route("/lots").get(lotController.getLots);

router.route("/parks").get(parkController.getParks);

module.exports = router;
