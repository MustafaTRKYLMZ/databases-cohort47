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

  // Add No-Bake Cheesecake recipe
  connection.query(
    "INSERT INTO recipes (name) VALUES (?)",
    ["No-Bake Cheesecake"],
    (err, result) => {
      if (err) {
        console.error("Error adding No-Bake Cheesecake recipe", err);
        return;
      }
      console.log("No-Bake Cheesecake recipe added successfully");

      // Add categories for No-Bake Cheesecake
      const categories = ["Cake", "No-Bake", "Vegetarian"];
      connection.query(
        "INSERT INTO Categories (name) VALUES ?",
        [categories.map((name) => [name])],
        (err, resultCategories) => {
          if (err) {
            console.error(
              "Error adding categories for No-Bake Cheesecake",
              err
            );
            return;
          }
          console.log("Categories added successfully");

          // Get category ID
          const categoryId = resultCategories.insertId;

          // Add entry to RecipeCategories table
          connection.query(
            "INSERT INTO RecipeCategories (recipe_id, category_id) VALUES (?, ?)",
            [result.insertId, categoryId],
            (err, resultRecipeCategories) => {
              if (err) {
                console.error(
                  "Error adding entry to RecipeCategories table",
                  err
                );
                return;
              }
              console.log("Entry added to RecipeCategories table successfully");

              // Add ingredients for No-Bake Cheesecake
              const ingredients = [
                "Condensed milk",
                "Cream Cheese",
                "Lemon Juice",
                "Pie Crust",
                "Cherry Jam",
              ];
              connection.query(
                "INSERT INTO Ingredients (name) VALUES ?",
                [ingredients.map((name) => [name])],
                (err, resultIngredients) => {
                  if (err) {
                    console.error(
                      "Error adding ingredients for No-Bake Cheesecake",
                      err
                    );
                    return;
                  }
                  console.log("Ingredients added successfully");

                  // Get inserted ingredient ID
                  const ingredientId = resultIngredients.insertId;

                  // Add entry to RecipeIngredients table
                  connection.query(
                    "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit_of_measurement) VALUES (?, ?, ?, ?)",
                    [result.insertId, ingredientId, null, null],
                    (err, resultRecipeIngredients) => {
                      if (err) {
                        console.error(
                          "Error adding entry to RecipeIngredients table",
                          err
                        );
                        return;
                      }
                      console.log(
                        "Entry added to RecipeIngredients table successfully"
                      );

                      // Add steps for No-Bake Cheesecake
                      const steps = [
                        "Beat Cream Cheese",
                        "Add condensed Milk and blend",
                        "Add Lemon Juice and blend",
                        "Add the mix to the pie crust",
                        "Spread the Cherry Jam",
                        "Place in refrigerator for 3h.",
                      ];
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
                            console.error(
                              "Error adding steps for No-Bake Cheesecake",
                              err
                            );
                            return;
                          }
                          console.log("Steps added successfully");

                          // Tüm işlemler tamamlandığında bağlantıyı sonlandır
                          connection.end();
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
// add Roasted Brussels Sprouts
