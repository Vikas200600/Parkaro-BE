const mockParks = require("../data/parkings");

const lotController = require("./lotController");

const parkData = mockParks.parks;

const getParks = (_req, res) => {
  res.json({ status: "success", data: parkData });
};

let allotParking = (req, res) => {
  const { regNo, type, lotName, duration } = req.body;
<<<<<<< HEAD
  const newId =
    parkData["keys"].length == 0
      ? "1"
      : (Math.max(...parkData["keys"]) + 1).toString();
=======
  const newId = (Math.max(...parkData["keys"]) + 1).toString();
>>>>>>> 61c10603e2407616450ddcf0c82c6c02ac3410d6
  const lotId = lotController.getLotId(lotName);
  const parkingInStamp = Date.now();
  const parkingOutStamp = duration ? duration * 3600000 + parkingInStamp : null;
  newParkDetails = {
    id: newId,
    lotId: lotId,
    regNo,
    type,
    lotName,
    parkingInStamp,
    parkingOutStamp,
    price: null,
  };
  parkData.keys.push(newId);
  parkData[newId] = newParkDetails;
  lotController.updateAvailability(lotId, newId, regNo, parkingOutStamp);
  res.json({ status: "success" });
};

let deallocateParking = (req, res) => {
  const { id } = req.params;
  let now = Date.now();
  let timeLapsed = now - parkData[id].parkingInStamp;
  let price = Math.ceil(timeLapsed / 3600000) * 20;
  parkData[id].parkingOutStamp = now;
  parkData[id].price = price;
  lotController.updateLotStatus(parkData[id].lotId);
  res.json({ status: "success" });
};

module.exports = {
  getParks: getParks,
  allotParking: allotParking,
  deallocateParking: deallocateParking,
};
