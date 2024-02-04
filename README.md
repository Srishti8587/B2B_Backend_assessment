#  REST API for an e-commerce system
This API provides endpoints for managing products and their variants. It allows creating, updating, deleting, and retrieving products. Each product can have multiple variants, each with specific details.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [DB Structure](#db-structure) 
- [Models](#models)
- [Project Structure](#project-structure)   
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)

## Features

- Create, update, delete, and retrieve products.
- Associate multiple variants with each product.
- Search products by name, description, or variant name.

## Getting Started

### Installation

1. Clone the repository:
 ```bash
 git clone https://github.com/Srishti8587/B2B_Backend_assessment.git
 ```

2. Install dependencies
```bash
npm install
```

### Environment Variables
```bash
PORT: 3000
MONGO_URL: <your_mongo_url>
```


## DB STRUCTURE

```
+-----------------+        +------------------+
|    Product      |        |      Variant     |
+-----------------+        +------------------+
| _id        (PK) |        | _id    (PK)      |
| product_name    |        | variant_name     |
| description     |        | sku   (unique)   |
| price           |        | additional_cost  |
+-----------------+        | stock_count      |
                           | product_id (FK)  |
                           +------------------+


```

## Models

### Product
- `id`: Primary key for the Product table.
- `product_name`: Name of the product (unique).
- `description`: Description of the product.
- `price`: Price of the product.

### Variant
- `id`: Primary key for the Variant table.
- `variant_name`: Name of the variant.
- `sku`: Stock Keeping Unit, a unique identifier for the variant.
- `additional_cost`: Additional cost compared to the base product cost.
- `stock_count`: Current stock count of the variant.
- `product_id (FK)`: Foreign key referencing the id in the Product table, establishing a relationship between Product and Variant.



## Project Structure

- **models**: Database models for Product and Variant.
- **repository**: Database interaction layer for CRUD operations.
- **services**: Business logic layer, acting as an intermediary between controllers and repositories.
- **controllers**: Handle HTTP requests and invoke services.
- **routes**: Define API routes and connect them to controllers.
- **middlewares**: Additional functions for handling specific tasks, such as validation.


## Endpoints
### 1. Create a product

- **Endpoint:** `POST /product`
- **Description:** Create a new product with/without its variants.


### 2.Get all products

- **Endpoint:** `GET /all-products`
- **Description:** Get all the products along with its variants.

### 3.Get product by Id

- **Endpoint:** `GET /product/:id`
- **Description:** Get product by its id along with its variants.

### 4.Delete product 

- **Endpoint:** `DELETE /delete_product/:id`
- **Description:** Delete product by its id along with its variants.

### 5.Update product 

- **Endpoint:** `PATCH /update_product/:id`
- **Description:** Update product by its id.


### 6.Search Product by it's product_name, description or by variant_name

- **Endpoint:** `GET /search`
- **Description:** Search Product by it's product_name, description or by variant_name.


## Testing
- Tests for the model to ensure data is being stored and retrieved correctly.
- Tests for each endpoint to ensure they function as expected.
- Tests to ensure the search functionality works as expected.

## Contributing
If you'd like to contribute, please follow these guidelines.




