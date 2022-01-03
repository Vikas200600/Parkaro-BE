const mockLots = require("./../data/slots");
// const parkController = require("./parkController");

let lotsData = mockLots.lots;

const getLots = (_req, res) => {
  res.json({ status: "success", data: lotsData });
};

const getLotByType = (req, res) => {
  const type = req.params.type.toUpperCase();
  let availableLot = [];
  lotsData.keys.forEach((key) => {
    lotsData[key].available && lotsData[key].type === type
      ? availableLot.push(lotsData[key].lotName)
      : "";
  });
  res.json(availableLot);
};

const addLot = (req, res) => {
  console.log(req.body);
  const { lotName, type } = req.body;
  let newId =
    lotsData["keys"].length == 0
      ? "1"
      : (Math.max(...lotsData["keys"]) + 1).toString();
  newLotDetails = {
    id: newId,
    parkingId: null,
    lotName,
    type,
    available: true,
    availableTime: null,
    regNoParked: null,
  };
  lotsData.keys.push(newId);
  lotsData[newId] = newLotDetails;
  res.json({ status: "success" });
};

const getOccupiedLots = (req, res) => {
  let occupiedLots = [];
  lotsData.keys.forEach((key) => {
    lotsData[key].available == false &&
      occupiedLots.push({
        id: lotsData[key].parkingId,
        option: lotsData[key].lotName,
      });
  });
  res.json(occupiedLots);
};

const getParkedVehicles = (req, res) => {
  let parkedVehicles = [];
  lotsData.keys.forEach((key) => {
    lotsData[key].available == false &&
      parkedVehicles.push({
        id: lotsData[key].parkingId,
        option: lotsData[key].regNoParked,
      });
  });
  res.json(parkedVehicles);
};

const updateLotStatus = (lotId) => {
  lotsData[lotId].parkingId = null;
  lotsData[lotId].available = true;
  lotsData[lotId].availableTime = null;
  lotsData[lotId].regNoParked = null;
};

//functions to change lotdata when parkdata changes
let getLotId = (lotName) => {
  let keyLength = lotsData.keys.length;
  for (let i = 0; i < keyLength; i++) {
    if (lotsData[lotsData.keys[i]].lotName === lotName) {
      return lotsData.keys[i];
    }
  }
  return null;
};

let updateAvailability = (lotId, parkingId, regNo, parkingOutStamp) => {
  lotsData[lotId].available = false;
  lotsData[lotId].availableTime = parkingOutStamp;
  lotsData[lotId].regNoParked = regNo;
  lotsData[lotId].parkingId = parkingId;
};

module.exports = {
  getLots: getLots,
  getLotByType: getLotByType,
  addLot: addLot,
  getOccupiedLots: getOccupiedLots,
  getParkedVehicles: getParkedVehicles,
  getLotId: getLotId,
  updateAvailability: updateAvailability,
  updateLotStatus: updateLotStatus,
};
