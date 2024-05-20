1. What columns violate 1NF?
=> food_code, food_description: include two value

2. What entities do you recognize that could be extracted?
Members
    member_id
    member_name
    member_address

Dinner
    dinner_id
    dinner_date
    venue_code

Venue
    venue_code
    venue_description
   

Food
    food_code
    food_description

Dinner_food
    dinner_id
    food_code


3. Name all the tables and columns that would make a 3NF compliant solution.
1. Member table
Column Name Data Type
member_id INT
member_name VARCHAR
member_address VARCHAR

2. Dinner table
dinner_id VARCHAR
dinner_date DATE
venue_code VARCHAR

3. Venue table
venue_code VARCHAR
venue_description VARCHAR

4. Food table
food_code VARCHAR
food_description VARCHAR

5. Dinner_food
dinner_id VARCHAR
food_code VARCHAR

6. Member_dinner
member_id INT
dinner_id VARCHAR

