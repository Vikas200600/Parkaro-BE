let parks = require("../data/parkings");

let getParks = (req, res) => {
  res.json({ status: "success", data: parks });
};

module.exports = {
  getParks: getParks,
};
