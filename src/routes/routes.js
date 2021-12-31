const router = require("express").Router();

const lotController = require("../controllers/lotController");
const parkController = require("../controllers/parkController");

router.get("/test", (req, res) => {
  res.json({ status: "success" });
});

router.route("/lots/:type").get(lotController.getLotByType);
router.route("/lots/add").post(lotController.addLot);
router.route("/lots").get(lotController.getLots);

router.route("/parks").get(parkController.getParks);
router.route("/parks/allot").post(parkController.allotParking);

module.exports = router;
