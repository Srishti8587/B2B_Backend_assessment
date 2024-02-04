#  REST API for an e-commerce system
This API provides endpoints for managing products and their variants. It allows creating, updating, deleting, and retrieving products. Each product can have multiple variants, each with specific details.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

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



