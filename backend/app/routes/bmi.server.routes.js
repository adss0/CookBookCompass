const bmi = require("../controllers/bmi.server.controllers");
const auth = require("../middleware/authentication.middleware");

module.exports = function (app) {
  app.route("/bmi").post(auth, bmi.add_bmi).get(auth, bmi.get_bmi);
};
