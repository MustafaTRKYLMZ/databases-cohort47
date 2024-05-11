connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db", err);
    return;
  }
  console.log("Connection established");

  // Add No-Bake Cheesecake recipe
  // addRecipes(recipes[0]);

  addRecipes(recipe[0]);
});

// add recipes
const addRecipes = async (recipe) => {
  connection.query(
    "INSERT INTO recipes (name) VALUES (?)",
    [recipe.name],
    async (err, result) => {
      if (err) {
        console.error("Error adding No-Bake Cheesecake recipe", err);
        return;
      }
      console.log("No-Bake Cheesecake recipe added successfully");

      // Add categories for No-Bake Cheesecake
      await addCategories(recipe.categories, result, recipe);
    }
  );
};
// add categories
const addCategories = async (categories, result, recipe) => {
  connection.query(
    "INSERT INTO Categories (name) VALUES ?",
    [categories.map((name) => [name])],
    async (err, resultCategories) => {
      if (err) {
        console.error("Error adding categories for No-Bake Cheesecake", err);
        return;
      }
      console.log("Categories added successfully");

      // Get category ID
      const categoryId = resultCategories.insertId;
      await addRecipeCategories(recipe, result, categoryId);
      // Add entry to RecipeCategories table
    }
  );
};

//add recipe categories
const addRecipeCategories = async (recipe, result, categoryId) => {
  connection.query(
    "INSERT INTO RecipeCategories (recipe_id, category_id) VALUES (?, ?)",
    [result.insertId, categoryId],
    async (err, resultRecipeCategories) => {
      if (err) {
        console.error("Error adding entry to RecipeCategories table", err);
        return;
      }
      console.log("Entry added to RecipeCategories table successfully");

      // Add ingredients for No-Bake Cheesecake

      await addIngredients(recipe, recipe.ingredients, result);
    }
  );
};

// add Ingredients
const addIngredients = async (recipe, ingredients, result) => {
  connection.query(
    "INSERT INTO Ingredients (name) VALUES ?",
    [ingredients.map((name) => [name])],
    async (err, resultIngredients) => {
      if (err) {
        console.error("Error adding ingredients for No-Bake Cheesecake", err);
        return;
      }
      console.log("Ingredients added successfully");

      // Get inserted ingredient ID
      const ingredientId = resultIngredients.insertId;

      // Add entry to RecipeIngredients table
      await addRecipeIngredients(recipe, result, ingredientId);
    }
  );
};

//add recipe ingredients
const addRecipeIngredients = async (recipe, result, ingredientId) => {
  connection.query(
    "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit_of_measurement) VALUES (?, ?, ?, ?)",
    [result.insertId, ingredientId, null, null],
    async (err, resultRecipeIngredients) => {
      if (err) {
        console.error("Error adding entry to RecipeIngredients table", err);
        return;
      }
      console.log("Entry added to RecipeIngredients table successfully");

      await addSteps(recipe.steps, result);
    }
  );
};

// add Roasted Brussels Sprouts
const addSteps = async (steps, result) => {
  connection.query(
    "INSERT INTO Steps (recipe_id, description, step_order) VALUES ?",
    [
      steps.map((description, index) => [
        result.insertId,
        description,
        index + 1,
      ]),
    ],
    (err, resultSteps) => {
      if (err) {
        console.error("Error adding steps", err);
        return;
      }
      console.log("Steps added successfully");
      connection.end();
      // Tüm işlemler tamamlandığında bağlantıyı sonlandır
    }
  );
};
