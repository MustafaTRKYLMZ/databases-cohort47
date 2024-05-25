What made you decide when to embed information? What assumptions did you make?
Decisions for Embedding Information:

Access Patterns: I thought about how often and in what way the data would be accessed. For example, venue and food details are often accessed together with dinner details, so embedding them increases efficiency.
Data Ownership and Lifecycle: Embedded data is tightly linked with the main document and shares the same lifecycle. For example, the venue and foods for a specific dinner.
Data Volume and Size: Embedded data should not grow too large and should remain manageable. For example, a dinner has a limited number of foods and one venue.
Assumptions:

Static or Rarely Changing Data: I assumed that venue and food details do not change frequently.
Limited Data Duplication: I assumed that duplicating data (like venue information in different dinners) is acceptable.
Query Performance: I assumed that embedding would improve query performance, as fewer queries and joins are needed.
If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you choose and why?
Database Choice:

Data Relationships and Complexity:

MySQL: If the data has complex relationships and requires data integrity, MySQL is better. MySQL is good for normalized data and complex queries.
MongoDB: If the data is hierarchical or document-oriented, with flexible schema design, MongoDB is better. MongoDB is good for denormalization and embedding data to improve performance.
Scalability and Flexibility:

MongoDB: If the application needs high scalability, horizontal scaling, and flexible schema evolution, MongoDB is preferred.
MySQL: MySQL is good for applications with stable schemas where transactional integrity and complex queries are important.
Performance and Query Requirements:

MongoDB: For fast read and write performance with document-based queries, MongoDB is better.
MySQL: For complex query requirements with joins and aggregations, MySQL is better.
Conclusion:

If the database needs complex relationships and data integrity, I would choose MySQL.
If the database needs flexible schema, high scalability, and document-oriented data, I would choose MongoDB.
