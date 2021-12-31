const mockParks = require("../data/parkings");

const lotController = require("./lotController");

let parkData = mockParks.parks;

let getParks = (_req, res) => {
  res.json({ status: "success", data: parkData });
};

let allotParking = (req, res) => {
  const { regNo, type, lotName, duration } = req.body;
  let newId = (Math.max(...parkData["keys"]) + 1).toString();
  let parkingInStamp = Date.now();
  let parkingOutStamp = duration ? duration * 3600000 + parkingInStamp : null;
  newParkDetails = {
    id: newId,
    regNo: regNo,
    type: type,
    lotName: lotName,
    parkingInStamp: parkingInStamp,
    parkingOutStamp: parkingOutStamp,
    price: null,
  };
  parkData.keys.push(newId);
  parkData[newId] = newParkDetails;
  lotController.updateAvailability(lotName, parkingOutStamp);
};

module.exports = {
  getParks: getParks,
  allotParking: allotParking,
};
