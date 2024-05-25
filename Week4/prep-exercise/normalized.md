1. What are collections?


Members Collection, Dinners Collection, Foods Collection 


2. What information will you embed in a document and which will you store normalised?


NoSQL JSON Structure

[
    {
        "member_id": 1,
        "member_name": "John Doe",
        "member_address": "123 Main St, Springfield",
        "dinners": [
            {
                "dinner_id": "d1",
                "dinner_date": "2023-05-25",
                "venue": {
                    "venue_code": "v1",
                    "venue_description": "Grand Hall"  // Embedded Venue Information
                },
                "foods": [
                    {
                        "food_code": "f1",
                        "food_description": "Chicken Curry"  // Embedded Foods
                    },
                    {
                        "food_code": "f2",
                        "food_description": "Vegetable Salad"
                    }
                ]
            }
        ]
    },
    {
        "member_id": 2,
        "member_name": "Jane Smith",
        "member_address": "456 Elm St, Springfield",
        "dinners": [
            {
                "dinner_id": "d2",
                "dinner_date": "2023-06-15",
                "venue": {
                    "venue_code": "v2",
                    "venue_description": "City Park"  // Embedded Venue Information
                },
                "foods": [
                    {
                        "food_code": "f3",
                        "food_description": "Beef Stew"  // Embedded Foods
                    },
                    {
                        "food_code": "f4",
                        "food_description": "Fruit Platter"
                    }
                ]
            }
        ]
    }
]



Dinners Collection
[
    {
        "dinner_id": "d1",
        "dinner_date": "2023-05-25",
        "venue": {
            "venue_code": "v1",
            "venue_description": "Grand Hall"  
        },
        "foods": [
            {
                "food_code": "f1",
                "food_description": "Chicken Curry" 
            },
            {
                "food_code": "f2",
                "food_description": "Vegetable Salad"
            }
        ]
    },
    {
        "dinner_id": "d2",
        "dinner_date": "2023-06-15",
        "venue": {
            "venue_code": "v2",
            "venue_description": "City Park"  
        },
        "foods": [
            {
                "food_code": "f3",
                "food_description": "Beef Stew" 
            },
            {
                "food_code": "f4",
                "food_description": "Fruit Platter"
            }
        ]
    }
]


Foods Collection (Normalized)
[
    {
        "food_code": "f1",
        "food_description": "Chicken Curry"  
    },
    {
        "food_code": "f2",
        "food_description": "Vegetable Salad"
    },
    {
        "food_code": "f3",
        "food_description": "Beef Stew"
    },
    {
        "food_code": "f4",
        "food_description": "Fruit Platter"
    }
]
