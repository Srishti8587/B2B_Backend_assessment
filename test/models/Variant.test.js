const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/index');

const VariantModel = require('../../src/models/Variant');
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
    jest.setTimeout(30000);
  await VariantModel.deleteMany({});
});

describe('Variant Model Tests', () => {
  it('should create a new variant', async () => {
    const product = await ProductModel.create({
      product_name: 'My Product',
      description: 'Test Description',
      price: 99.99,
    });

    const variantData = {
      variant_name: 'Color',
      sku: 'SKU123',
      additional_cost: 10.99,
      stock_count: 50,
      product_id: product._id,
    };

    const variant = new VariantModel(variantData);
    const savedVariant = await variant.save();

    expect(savedVariant._id).toBeDefined();
    expect(savedVariant.variant_name).toBe(variantData.variant_name);
    expect(savedVariant.sku).toBe(variantData.sku);
    expect(savedVariant.additional_cost).toBe(variantData.additional_cost);
    expect(savedVariant.stock_count).toBe(variantData.stock_count);
    expect(savedVariant.product_id).toEqual(variantData.product_id);
  });

  it('should retrieve a variant', async () => {
    const product = await ProductModel.create({
      product_name: 'My Product_2',
      description: 'Test Description',
      price: 99.99,
    });

    const variantData = {
      variant_name: 'Color',
      sku: 'SKU456',
      additional_cost: 10.99,
      stock_count: 50,
      product_id: product._id,
    };

    const variant = new VariantModel(variantData);
    await variant.save();

    const retrievedVariant = await VariantModel.findOne({ sku: 'SKU456' });

    expect(retrievedVariant).toBeDefined();
    expect(retrievedVariant.variant_name).toBe(variantData.variant_name);
    expect(retrievedVariant.sku).toBe(variantData.sku);
    expect(retrievedVariant.additional_cost).toBe(variantData.additional_cost);
    expect(retrievedVariant.stock_count).toBe(variantData.stock_count);
    expect(retrievedVariant.product_id).toEqual(variantData.product_id);
  });
});