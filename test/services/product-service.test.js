const ProductService = require('../../src/services/product-service');
const ProductRepository = require('../../src/repository/product-repository');

jest.mock('../../src/repository/product-repository.js');

describe('Product Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create product successfully', async () => {
    const mockProductData = {
      _id: 'productId',
      product_name: 'Test Product',
      description: 'Product Description',
      price: 29.99,
    };

    ProductRepository.prototype.createproduct.mockResolvedValueOnce(mockProductData);
    const productService = new ProductService();
    const result = await productService.createProduct({
        product_name: 'Test Product',
        description: 'Product Description',
        price: 29.99,
      });
    expect(ProductRepository.prototype.createproduct).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProductData);
  });
  


  // searching service
  test('should search products successfully', async () => {
    const mockSearchResult = [
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
    ];

    ProductRepository.prototype.searchProduct.mockResolvedValueOnce(mockSearchResult);

    const productService = new ProductService();
    const result = await productService.searchProduct('Test');
    expect(ProductRepository.prototype.searchProduct).toHaveBeenCalledTimes(1);
    expect(ProductRepository.prototype.searchProduct).toHaveBeenCalledWith('Test');
    expect(result).toEqual(mockSearchResult);
  });
  

  test('should delete product successfully', async () => {
    const productId = 'testProductId';
    ProductRepository.prototype.deleteProduct.mockResolvedValueOnce(true);

    const productService = new ProductService();
    const result = await productService.deleteProduct(productId);

    expect(ProductRepository.prototype.deleteProduct).toHaveBeenCalledTimes(1);
    expect(ProductRepository.prototype.deleteProduct).toHaveBeenCalledWith(productId);
    expect(result).toBe(true);
  });



  test('should update product successfully', async () => {
    const productId = 'testProductId';
    const updatedData = {
      product_name: 'Updated Product',
      description: 'Updated Description',
      price: 39.99,
    };

    ProductRepository.prototype.updateProduct.mockResolvedValueOnce({
      _id: productId,
      ...updatedData,
    });

    const productService = new ProductService();

    const result = await productService.updateProduct(productId, updatedData);
    expect(ProductRepository.prototype.updateProduct).toHaveBeenCalledTimes(1);
    expect(ProductRepository.prototype.updateProduct).toHaveBeenCalledWith(productId, updatedData);
    expect(result).toEqual({ _id: productId, ...updatedData });
  });



  test('should get all products successfully', async () => {
    const mockProducts = [
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
    ];

    ProductRepository.prototype.getAllproduct.mockResolvedValueOnce(mockProducts);
    const productService = new ProductService();
    const result = await productService.getAllproducts();
    expect(ProductRepository.prototype.getAllproduct).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
  });

});
