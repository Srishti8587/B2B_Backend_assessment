const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProduct,
} = require("../../src/controllers/product-controller");

const ProductService = require("../../src/services/product-service");

jest.mock("../../src/services/product-service.js");

describe("Product Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a product', async () => {
    // Mock request data
    const req = {
      body: {
        product_name: 'Test Product',
        description: 'This is a test product',
        price: 29.99,
      },
    };

    // Mock response data
    const mockResponse = {
      _id: 'mockProductId',
      product_name: 'Test Product',
      description: 'This is a test product',
      price: 29.99
    };
    ProductService.prototype.createProduct.mockResolvedValueOnce(mockResponse);

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createProduct(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: mockResponse,
      success: true,
      message: 'Successfully created product',
    });
  });


  // get all product
  test('should get all products successfully', async () => {
    const mockProducts = [
      {
        _id: 'product1',
        product_name: 'Test Product 1',
        description: 'Description 1',
        price: 49.99,
      },
      {
        _id: 'product2',
        product_name: 'Test Product 2',
        description: 'Description 2',
        price: 79.99,
      },
    ];
    ProductService.prototype.getAllproducts.mockResolvedValueOnce(mockProducts);
    const req = {};
    

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getAllProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: mockProducts,
      success: true,
      message: 'Successfully got all products',
    });
  });


  // search for products 
  test('should search for products and variants successfully', async () => {
    const mockQueryResult = [
      {
        _id: 'productId1',
        product_name: 'Test Product 1',
        description: 'Description 1',
        price: 49.99,
      },
      {
        _id: 'productId2',
        product_name: 'Test Product 2',
        description: 'Description 2',
        price: 79.99,
      },
      {
        _id: 'variantId1',
        variant_name: 'Test Variant',
        sku: 'SKU123',
        additional_cost: 10.99,
        stock_count: 50,
        product_id: 'productId1',
      },
    ];

    ProductService.prototype.searchProduct.mockResolvedValueOnce(mockQueryResult);
    const req = {
      query: { q: 'Test' },
    };


    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await searchProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockQueryResult,
      success: true,
      message: 'Successfully search the query',
    });
  });

  

  test('should delete product successfully', async () => {
    const mockResult = true;
    ProductService.prototype.deleteProduct.mockResolvedValueOnce(mockResult);

    const req = {
      params: { id: 'productId' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await deleteProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Successfully deleted product',
    });
  });

});
