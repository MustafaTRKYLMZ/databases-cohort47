const recipes = [
  {
    name: "No-Bake Cheesecake",
    categories: ["Cake", "No-Bake", "Vegetarian"],
    ingredients: [
      "Condensed milk",
      "Cream Cheese",
      "Lemon Juice",
      "Pie Crust",
      "Cherry Jam",
    ],
    steps: [
      "Beat Cream Cheese",
      "Add condensed Milk and blend",
      "Add Lemon Juice and blend",
      "Add the mix to the pie crust",
      "Spread the Cherry Jam",
      "Place in refrigerator for 3h.",
    ],
  },
  {
    name: "Roasted Brussels Sprouts",
    categories: ["Vegan", "Gluten-Free"],
    ingredients: [
      "Brussels Sprouts",
      "Lemon juice",
      "Sesame seeds",
      "Pepper",
      "Salt",
      "Olive oil",
    ],
    steps: [
      "Preheat the oven",
      "Mix the ingredients in a bowl",
      "Spread the mix on baking sheet",
      "Bake for 30'",
    ],
  },
  {
    name: "Mac & Cheese",
    categories: ["Vegetarian"],
    ingredients: [
      "Macaroni",
      "Butter",
      "Flour",
      "Salt",
      "Pepper",
      "Milk",
      "Shredded Cheddar cheese",
    ],
    steps: [
      "Cook Macaroni for 8'",
      "Melt butter in a saucepan",
      "Add flour, salt, pepper and mix",
      "Add Milk and mix",
      "Cook until mix is smooth",
      "Add cheddar cheese",
      "Add the macaroni",
    ],
  },
  {
    name: "Tamagoyaki Japanese Omelette",
    categories: ["Vegetarian", "Japanese"],
    ingredients: ["Eggs", "Soy sauce", "Sugar", "Salt", "Olive Oil"],
    steps: [
      "Beat the eggs",
      "Add soya sauce, sugar and salt",
      "Add oil to a sauce pan",
      "Bring to medium heat",
      "Add some mix to the sauce pan",
      "Let is cook for 1'",
      "Add oil to a sauce pan",
      "Add some mix to the sauce pan",
      "Let is cook for 1'",
      "Remove pan from fire",
    ],
  },
];

const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "company",
});

// Promisify connection.query method
const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db", err);
    return;
  }
  console.log("Connected to database");

  addRecipes()
    .then(() => {
      console.log("All recipes added successfully");
    })
    .catch((error) => {
      console.error("Error adding recipes:", error);
    })
    .finally(() => {
      connection.end();
    });
});

const addRecipes = async () => {
  try {
    for (const recipe of recipes) {
      const recipeId = await addRecipe(recipe);
      await addCategories(recipe.categories, recipeId);
      await addIngredients(recipe.ingredients, recipeId);
      await addSteps(recipe.steps, recipeId);
    }
  } catch (error) {
    throw error;
  }
};

const addRecipe = async (recipe) => {
  try {
    const result = await query("INSERT INTO recipes (name) VALUES (?)", [
      recipe.name,
    ]);
    console.log(`${recipe.name} recipe added successfully`);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const addCategories = async (categories, recipeId) => {
  try {
    const resultCategories = await query(
      "INSERT INTO Categories (name) VALUES ?",
      [categories.map((name) => [name])]
    );
    console.log("Categories added successfully");

    const categoryId = resultCategories.insertId;
    await addRecipeCategories(recipeId, categoryId);
  } catch (error) {
    throw error;
  }
};

const addRecipeCategories = async (recipeId, categoryId) => {
  try {
    await query(
      "INSERT INTO RecipeCategories (recipe_id, category_id) VALUES (?, ?)",
      [recipeId, categoryId]
    );
    console.log("Entry added to RecipeCategories table successfully");
  } catch (error) {
    throw error;
  }
};

const addIngredients = async (ingredients, recipeId) => {
  try {
    const resultIngredients = await query(
      "INSERT INTO Ingredients (name) VALUES ?",
      [ingredients.map((name) => [name])]
    );
    console.log("Ingredients added successfully");

    const ingredientId = resultIngredients.insertId;
    await addRecipeIngredients(recipeId, ingredientId);
  } catch (error) {
    throw error;
  }
};

const addRecipeIngredients = async (recipeId, ingredientId) => {
  try {
    await query(
      "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit_of_measurement) VALUES (?, ?, ?, ?)",
      [recipeId, ingredientId, null, null]
    );
    console.log("Entry added to RecipeIngredients table successfully");
  } catch (error) {
    throw error;
  }
};

const addSteps = async (steps, recipeId) => {
  try {
    await query(
      "INSERT INTO Steps (recipe_id, description, step_order) VALUES ?",
      [steps.map((description, index) => [recipeId, description, index + 1])]
    );
    console.log("Steps added successfully");
  } catch (error) {
    throw error;
  }
};
