/* whole recipes list */
SELECT * FROM Recipes

/* recipes with category */
SELECT * FROM Categories

/* recipes with ingredients */
SELECT * FROM Ingredients

/* recipes with steps */
SELECT * FROM Steps

/* recipes with ingredients and quantities */
SELECT * FROM RecipeIngredients

/* recipes by category */

SELECT r.* 
FROM Recipes r
JOIN Categories c ON r.category_id = c.category_id
WHERE c.name = 'Salads'; 