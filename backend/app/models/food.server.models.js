const db = require("../../database");

const getFood = (q, done) => {
  console.log(q);
  let query =
    "SELECT foodId,name, image from Foods WHERE name LIKE '%" + q + "%'";

  // Execute the query
  db.all(query, async function (err, rows) {
    if (err) {
      return done(err);
    }
    // console.log(rows);
    return done(null, rows);
  });
};

const foodByFilter = (
  ingredients,
  allergens,
  budget,
  cuisine,
  servings,
  done
) => {
  let sql = `
      SELECT f.foodId, f.name as name, f.image as image
      FROM foods AS f
      INNER JOIN FoodIngredients AS fi ON fi.foodId = f.foodId
      INNER JOIN Ingredients AS i ON i.ingredientsId = fi.ingredientId
      LEFT JOIN FoodAllergens AS fa ON fa.foodId = f.foodId
      LEFT JOIN Allergens AS ai ON ai.allergenId = fa.allergenId
      WHERE i.name IN (${ingredients.map(() => "?").join(", ")})
    `;

  let filters = [...ingredients];

  if (allergens) {
    sql += ` AND (ai.name IS NULL OR ai.name NOT IN (${allergens
      .map(() => "?")
      .join(", ")}))`;
    filters.push(...allergens);
  }

  if (budget) {
    sql += ` AND f.price <= ?`;
    filters.push(budget);
  }

  if (cuisine) {
    sql += ` AND f.cuisine IN (${cuisine.map(() => "?").join(", ")})`;
    filters.push(...cuisine);
  }

  if (servings) {
    sql += ` AND f.servings = ?`;
    filters.push(servings);
  }

  sql += ` GROUP BY f.name HAVING COUNT(DISTINCT i.name) = ?`;
  filters.push(ingredients.length);

  console.log(sql);
  db.all(sql, filters, (err, rows) => {
    if (err) {
      return done(err);
    }
    console.log(rows);
    return done(null, rows);
  });
};

const foodById = (foodId, done) => {
  let sql = `
      SELECT f.name, f.image, f.recipe, f.budget, f.cuisine, f.calories, a.name AS allergen, i.name AS ingredient
        FROM foods AS f
        LEFT JOIN FoodAllergens AS fa ON fa.foodId = f.foodId
        LEFT JOIN Allergens AS a ON a.allergenId = fa.allergenId
        INNER JOIN FoodIngredients AS fi ON fi.foodId = f.foodId
        INNER JOIN Ingredients AS i ON i.ingredientsId = fi.ingredientId
        WHERE f.foodId = ?
    `;

  db.all(sql, [foodId], (err, rows) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    // Process the rows
    const processedRows = rows.map((row) => {
      // If allergen is null, set it to 'none'
      if (row.allergen === null) {
        return {
          ...row,
          allergen: "none",
        };
      }
      return row;
    });

    let foods = {};
    processedRows.forEach((row) => {
      const {
        image,
        name,
        recipe,
        budget,
        cuisine,
        calories,
        allergen,
        ingredient,
      } = row;
      if (!foods[name]) {
        foods[name] = {
          image,
          name,
          recipe,
          budget,
          cuisine,
          calories,
          allergen,
          ingredients: [ingredient],
        };
      } else {
        foods[name].ingredients.push(ingredient);
      }
    });

    // Converting the object into an  of foods

    return done(null, foods);
  });
};

module.exports = {
  getFood,
  foodByFilter,
  foodById,
};
