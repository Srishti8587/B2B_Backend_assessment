const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/index'); // Replace with the actual path to your Express app

const ProductModel = require('../../src/models/Product');
const { MONGO_URL } = require('../../src/config/serverconfig');

beforeAll(async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await ProductModel.deleteMany({});
});

describe('Product Model Tests', () => {
  it('should create a new product', async () => {
    const productData = {
      product_name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
    };

    const product = new ProductModel(productData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.product_name).toBe(productData.product_name);
    expect(savedProduct.description).toBe(productData.description);
    expect(savedProduct.price).toBe(productData.price);
  });

  it('should retrieve a product', async () => {
    const productData = {
      product_name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
    };

    const product = new ProductModel(productData);
    await product.save();

    const retrievedProduct = await ProductModel.findOne({ product_name: 'Test Product' });

    expect(retrievedProduct).toBeDefined();
    expect(retrievedProduct.product_name).toBe(productData.product_name);
    expect(retrievedProduct.description).toBe(productData.description);
    expect(retrievedProduct.price).toBe(productData.price);
  });
});

