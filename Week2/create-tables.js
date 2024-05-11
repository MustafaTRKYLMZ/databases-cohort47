const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "company",
});
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db", err);
    return;
  }
  console.log("Connection established");
});

// create recipes query
connection.query(
  `CREATE TABLE IF NOT EXISTS recipes(
    recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    category_id INT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)`,
  (err, result) => {
    if (err) {
      console.log("Error creating database", err);
      return;
    }
    console.log("Recipes table created successfully");
    console.log(result);
  }
);
//create categories table query
connection.query(
  `CREATE TABLE IF NOT EXISTS Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
)`,
  (err, result) => {
    if (err) {
      console.log("Error creating database", err);
      return;
    }
    console.log("Category table created successfully");
    console.log(result);
  }
);
// ctreate ingredients table query
connection.query(
  `CREATE TABLE IF NOT EXISTS Ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
)`,
  (err, result) => {
    if (err) {
      console.log("Error creating database", err);
      return;
    }
    console.log("Ingredients table created successfully");
    console.log(result);
  }
);
//create RecipeCategories table query
connection.query(
  `CREATE TABLE IF NOT EXISTS RecipeCategories (recipe_id INT, category_id INT, FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id), FOREIGN KEY (category_id) REFERENCES Categories(category_id), PRIMARY KEY (recipe_id, category_id))`,
  (err, result) => {
    if (err) {
      console.log("Error creating database", err);
      return;
    }
    console.log("RecipeCategories table created successfully");
    console.log(result);
  }
);

//create RecipeIngredients table query
connection.query(
  `CREATE TABLE IF NOT EXISTS RecipeIngredients (
    recipe_id INT,
    ingredient_id INT,
    quantity FLOAT,
    unit_of_measurement VARCHAR(20),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
)`,
  (err, result) => {
    if (err) {
      console.log("Error creating database", err);
      return;
    }
    console.log("RecipeIngredients table created successfully");
    console.log(result);
  }
);
// create steps table query
connection.query(
  `CREATE TABLE IF NOT EXISTS Steps (
    step_id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT,
    description TEXT,
    step_order INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
)`,
  (err, result) => {
    if (err) {
      console.log("Error creating database", err);
      return;
    }
    console.log("Steps table created successfully");
    console.log(result);
  }
);
// const recipesQuery =

connection.end();
