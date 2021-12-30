const mockLots = require("./../data/slots");

let lotsData = mockLots.lots;

const getLots = (req, res) => {
  res.json({ status: "success", data: lotsData });
};

module.exports = {
  getLots: getLots,
};
