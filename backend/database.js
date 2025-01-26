const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    db.run(
      `CREATE TABLE users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                first_name text,
                last_name text,
                email text UNIQUE NOT NULL,
                password text,
                salt text,
                age TEXT,
                gender TEXT,
                bmi TEXT,
                session_token text,
                CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          console.log("Users table already created");
        } else {
          console.log("Users table created");
        }
      }
    );

    db.run(
      `CREATE TABLE "Allergens" (
	"allergenId"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("allergenId" AUTOINCREMENT)
)`,
      (err) => {
        if (err) {
          console.log("Allergens table already created");
        } else {
          console.log("Allergens table created");
        }
      }
    );

    db.run(
      `CREATE TABLE "Equipments" (
	"equipmentId"	INTEGER NOT NULL UNIQUE,
	"equipmentName"	TEXT NOT NULL,
	PRIMARY KEY("equipmentId" AUTOINCREMENT)
)`,
      (err) => {
        if (err) {
          // console.log(err)
          console.log("Equipments table already created");
        } else {
          console.log("Equipments table created");
        }
      }
    );

    db.run(
      `CREATE TABLE "FoodAllergens" (
	"foodId"	INTEGER NOT NULL,
	"allergenId"	INTEGER,
	FOREIGN KEY("allergenId") REFERENCES "Allergens"("allergenId"),
	FOREIGN KEY("foodId") REFERENCES "Foods"("foodId")
)`,
      (err) => {
        if (err) {
          console.log("FoodAllergens table already created");
        } else {
          console.log("FoodAllergens table created");
        }
      }
    );

    db.run(
      `CREATE TABLE "FoodIngredients" (
	"ingredientId"	INTEGER NOT NULL,
	"foodId"	INTEGER NOT NULL,
	FOREIGN KEY("foodId") REFERENCES "Foods"("foodId"),
	FOREIGN KEY("ingredientId") REFERENCES "Ingredients"("ingredientsId")
)`,
      (err) => {
        if (err) {
          console.log("FoodIngredients table already created");
        } else {
          console.log("FoodIngredients table created");
        }
      }
    );

    db.run(
      `CREATE TABLE "Foods" (
	"foodId"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	"budget"	INTEGER,
	"image"	TEXT NOT NULL,
	"servings"	INTEGER,
	"recipe"	TEXT,
	"cuisine"	TEXT, calories,
	PRIMARY KEY("foodId" AUTOINCREMENT)
)`,
      (err) => {
        if (err) {
          console.log("Foods table already created");
        } else {
          console.log("Foods table created");
        }
      }
    );

    db.run(
      `CREATE TABLE "Ingredients" (
	"ingredientsId"	INTEGER NOT NULL UNIQUE,
	"Name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("ingredientsId" AUTOINCREMENT)
)`,
      (err) => {
        if (err) {
          console.log("Ingredients table already created");
        } else {
          console.log("Ingredients table created");
        }
      }
    );
  }
});

module.exports = db;
