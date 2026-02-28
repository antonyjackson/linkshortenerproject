---
description: Read this file to understand how to fetch data from the database in this project.
---
# Data Fetching Instructions
This document provides instructions on how to fetch data from the database in this project. Follow these guidelines to ensure consistency and efficiency in your data retrieval processes.

## 1. Use Server Components for Data Fetching
ALWAYS use server components to fetch data from the database. This ensures that data fetching is done on the server side, improving performance and security.

## 2. Data Fetching Methods
ALWAYS user the helper functions in the /data folder to fetch data from the database. These helper functions are designed to abstract away the complexities of database queries and provide a consistent interface for data retrieval.

ALL helper functions in the /data folder must use Drizzle ORM to interact with the database. Drizzle ORM provides a type-safe and efficient way to perform database operations, ensuring that your data fetching code is robust and maintainable.
