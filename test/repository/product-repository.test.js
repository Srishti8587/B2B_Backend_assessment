const ProductRepository = require("../../src/repository/product-repository");
const ProductModel = require("../../src/models/Product");
const VariantModel = require("../../src/models/Variant");

jest.mock("../../src/models/Product");
jest.mock("../../src/models/Variant");

describe("ProductRepository Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // creating the product
  test("should create a product with variants", async () => {
    const mockProductData = {
      product_name: "Test1 Product",
      description: "Test Description",
      price: 99.99,
    };

    const mockVariants = [
      {
        variant_name: "Color",
        sku: "SKU123",
        additional_cost: 10.99,
        stock_count: 50,
      },
    ];

    ProductModel.mockImplementationOnce(() => ({
      save: jest.fn().mockResolvedValueOnce({}),
    }));

    VariantModel.create.mockResolvedValueOnce([
      {
        _id: "variantId123",
      },
    ]);

    const productRepository = new ProductRepository();
    const result = await productRepository.createproduct({
      ...mockProductData,
      variants: mockVariants,
    });

    expect(ProductModel).toHaveBeenCalledTimes(1);
    expect(ProductModel).toHaveBeenCalledWith({
      product_name: "Test1 Product",
      description: "Test Description",
      price: 99.99,
    });

    expect(VariantModel.create).toHaveBeenCalledTimes(1);
    expect(VariantModel.create).toHaveBeenCalledWith([
      {
        variant_name: "Color",
        sku: "SKU123",
        additional_cost: 10.99,
        stock_count: 50,
        product_id: result._id,
      },
    ]);
  });

  // should get all products
  test("should get all products", async () => {
    const mockProducts = [
      {
        _id: "productId1",
        product_name: "Product 1",
        description: "Description 1",
        price: 49.99,
      },
      {
        _id: "productId2",
        product_name: "Product 2",
        description: "Description 2",
        price: 79.99,
      },
    ];

    ProductModel.find.mockResolvedValueOnce(mockProducts);

    const productRepository = new ProductRepository();
    const result = await productRepository.getAllproduct();

    expect(ProductModel.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
  });

  // updating the product
  test("should update a product", async () => {
    const mockUpdatedProduct = {
      _id: "productId1",
      product_name: "Updated Product",
      description: "Updated Description",
      price: 59.99,
    };

    ProductModel.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedProduct);

    const productRepository = new ProductRepository();
    const result = await productRepository.updateProduct("productId1", {
      product_name: "Updated Product",
      description: "Updated Description",
      price: 59.99,
    });

    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "productId1",
      {
        product_name: "Updated Product",
        description: "Updated Description",
        price: 59.99,
      },
      { new: true }
    );

    expect(result).toEqual(mockUpdatedProduct);
  });

  // delete a product
  test("should delete a product and its variants", async () => {
    const productToDeleteId = "productId1";

    const mockProduct = {
      _id: "productId1",
      product_name: "Test Product",
      description: "Test Description",
      price: 99.99,
    };

    const mockVariants = [
      {
        _id: "variantId1",
        variant_name: "Color",
        sku: "SKU123",
        additional_cost: 10.99,
        stock_count: 50,
        product_id: "productId1",
      },
      // Add more variants if needed
    ];

    ProductModel.findByIdAndDelete.mockResolvedValueOnce(mockProduct);
    VariantModel.deleteMany.mockResolvedValueOnce({ n: mockVariants.length });

    const productRepository = new ProductRepository();
    const result = await productRepository.deleteProduct(productToDeleteId);

    expect(ProductModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(ProductModel.findByIdAndDelete).toHaveBeenCalledWith("productId1");

    expect(VariantModel.deleteMany).toHaveBeenCalledTimes(1);
    expect(VariantModel.deleteMany).toHaveBeenCalledWith({
      product_id: "productId1",
    });

    expect(result).toBe(true);
  });




  // searching the product
//   it('should search for products and variants', async () => {
//     const query = 'Test';

//     const mockSearchedProducts = [
//       {
//         _id: 'productId1',
//         product_name: 'Test Product 1',
//         description: 'Description 1',
//         price: 49.99,
//       },
//       {
//         _id: 'productId2',
//         product_name: 'Test Product 2',
//         description: 'Description 2',
//         price: 79.99,
//       },
//     ];

//     const mockVariantIds = [
//       {
//         _id: 'variantId1',
//         variant_name: 'Test Variant',
//         sku: 'SKU123',
//         additional_cost: 10.99,
//         stock_count: 50,
//         product_id: 'productId1',
//       },
//     ];

//     const mockProductIds = ['productId1', 'productId2'];

//     const mockVariantsProduct = [
//       {
//         _id: 'variantId2',
//         variant_name: 'Test Variant 2',
//         sku: 'SKU456',
//         additional_cost: 15.99,
//         stock_count: 30,
//         product_id: 'productId2',
//       },
//     ];

//     ProductModel.find.mockResolvedValueOnce(mockSearchedProducts);
//     VariantModel.find.mockResolvedValueOnce(mockVariantIds);
//     VariantModel.find.mockResolvedValueOnce(mockVariantsProduct);

//     const productRepository = new ProductRepository();
//     const result = await productRepository.searchProduct(query);

//     expect(ProductModel.find).toHaveBeenCalledTimes(1);
//     expect(ProductModel.find).toHaveBeenCalledWith({
//       $or: [
//         { product_name: { $regex: query, $options: 'i' } },
//         { description: { $regex: query, $options: 'i' } },
//       ],
//     });

//     expect(VariantModel.find).toHaveBeenCalledTimes(2);
//     expect(VariantModel.find).toHaveBeenCalledWith({ variant_name: { $regex: query, $options: 'i' } });
//     expect(VariantModel.find).toHaveBeenCalledWith({ product_id: { $in: mockProductIds } });

//     expect(result).toEqual([...mockVariantIds, ...mockVariantsProduct]);
//   });
  
});
