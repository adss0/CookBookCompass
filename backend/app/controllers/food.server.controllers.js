const foods = require("../models/food.server.models");

const get_food = (req, res) => {
  let q = req.query.q;

  if (!q || q === null || q === undefined) {
    q = "";
  }

  foods.getFood(q, (err, recipes) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    console.log("recipes");
    // console.log(recipes);
    return res.status(200).send(recipes);
  });
};

const food_by_filter = (req, res) => {
  // Extract parameters from the request body
  let ingredients = req.body.ingredients;
  let allergens = req.body.allergens || null; // Default to null if not provided
  let budget = req.body.budget || null; // Default to null if not provided
  let cuisine = req.body.cuisine || null; // Default to null if not provided
  let servings = req.body.servings || null; // Default to null if not provided

  // Validate required fields
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({
      error: "Ingredients are required and must be a non-empty array.",
    });
  }

  // Call the model function
  foods.foodByFilter(
    ingredients,
    allergens,
    budget,
    cuisine,
    servings,
    (err, recipes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      //   console.log("recipes");
      //   console.log(recipes);
      return res.status(200).json(recipes);
    }
  );
};

const food_by_id = (req, res) => {
  const foodId = req.params.foodsId;

  console.log(foodId);

  foods.foodById(foodId, (err, recipe) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    if (!recipe) {
      console.log("Recipe not found");
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(recipe);
  });
};

module.exports = {
  get_food,
  food_by_filter,
  food_by_id,
};
