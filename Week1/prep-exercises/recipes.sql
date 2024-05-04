CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE Recipes (
    recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    category_id INT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE RecipeIngredients (
    recipe_id INT,
    ingredient_id INT,
    quantity FLOAT,
    unit_of_measurement VARCHAR(20),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE Steps (
    step_id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT,
    description TEXT,
    step_order INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);