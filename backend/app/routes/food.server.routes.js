const foods = require("../controllers/food.server.controllers");
const auth = require("../middleware/authentication.middleware");

module.exports = function (app) {
  app.route("/foodsSearch").get(foods.get_food);

  app.route("/foodsbyFilter").post(foods.food_by_filter);

  app.route("/foods/:foodsId").get(foods.food_by_id);
};
