const mockLots = require("./../data/slots");

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
  let newId = (Math.max(...lotsData["keys"]) + 1).toString();
  newLotDetails = {
    id: newId,
    ...req.body,
    available: true,
    availableTime: null,
  };
  lotsData.keys.push(newId);
  lotsData[newId] = newLotDetails;
};

//functions to change lotdata when parkdata changes
const updateAvailability = (lotName, parkingOutStamp) => {
  console.log(parkingOutStamp);
  let keyLength = lotsData.keys.length;
  for (let i = 0; i < keyLength; i++) {
    if (lotsData[lotsData.keys[i]].lotName == lotName) {
      lotsData[lotsData.keys[i]].available = false;
      lotsData[lotsData.keys[i]].availableTime = parkingOutStamp;
      break;
    }
  }
};

module.exports = {
  getLots: getLots,
  getLotByType: getLotByType,
  addLot: addLot,
  updateAvailability: updateAvailability,
};
