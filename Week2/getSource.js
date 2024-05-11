const mysql = require("mysql");
const util = require("util");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "company",
});

// Convert connection query to async/await
const query = util.promisify(connection.query).bind(connection);

// Check if all vegetarian recipes contain potatoes
const getVegetarianRecipesWithPotatoes = async () => {
  try {
    const sql = `
      SELECT *
      FROM recipes
      WHERE recipe_id IN (
        SELECT recipe_id
        FROM RecipeIngredients
        WHERE ingredient_id IN (
          SELECT ingredient_id
          FROM Ingredients
          WHERE name = 'Cherry Jam'
        )
      )
      AND recipe_id IN (
        SELECT recipe_id
        FROM RecipeCategories
        WHERE category_id IN (
          SELECT category_id
          FROM Categories
          WHERE name = 'Vegetarian'
        )
      )
    `;
    const vegetarianRecipesWithPotatoes = await query(sql);
    console.log(
      "Vegetarian recipes with Cherry Jam:",
      vegetarianRecipesWithPotatoes
    );
  } catch (error) {
    console.error("Error getting vegetarian recipes with Cherry Jam:", error);
  }
};

// Get all cakes that do not need baking
const getCakesNoBake = async () => {
  try {
    const sql = `
      SELECT *
      FROM recipes
      WHERE recipe_id IN (
        SELECT recipe_id
        FROM RecipeCategories
        WHERE category_id IN (
          SELECT category_id
          FROM Categories
          WHERE name = 'Cake'
        )
      )
      AND recipe_id NOT IN (
        SELECT recipe_id
        FROM RecipeCategories
        WHERE category_id IN (
          SELECT category_id
          FROM Categories
          WHERE name = 'Bake'
        )
      )
    `;
    const cakesNoBake = await query(sql);
    console.log("Cakes that do not need baking:", cakesNoBake);
  } catch (error) {
    console.error("Error getting cakes that do not need baking:", error);
  }
};

// Get vegetarian and Japanese recipes
const getVeganJapaneseRecipes = async () => {
  try {
    const sql = `
      SELECT *
      FROM recipes
      WHERE recipe_id IN (
        SELECT recipe_id
        FROM RecipeCategories
        WHERE category_id IN (
          SELECT category_id
          FROM Categories
          WHERE name IN ('Vegan', 'Japanese')
        )
      )
    `;
    const veganJapaneseRecipes = await query(sql);
    console.log("Vegan and Japanese recipes:", veganJapaneseRecipes);
  } catch (error) {
    console.error("Error getting vegan and Japanese recipes:", error);
  }
};

// Call the functions
getVegetarianRecipesWithPotatoes();
getCakesNoBake();
getVeganJapaneseRecipes();
