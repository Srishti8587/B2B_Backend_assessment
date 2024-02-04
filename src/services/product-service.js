const ProductRepository = require('../repository/product-repository');

class ProductService {
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async createProduct (data){
        try{
               const new_product = await this.productRepository.createproduct(data);
               return new_product;
        }
        catch(error)
        {
            console.log("Error in creating product at service layer");
            throw(error);
        }
    }

    async getAllproducts()
    {
        try{
                 const products=await this.productRepository.getAllproduct();
                 return products;
        }
        catch(error)
        {
            console.log("Error in getting product at service layer");
            throw({error});
        }
    }

    async updateProduct(id,data)
    {
        try{
               const product = await this.productRepository.updateProduct(id,data);
               return product;
        }
        catch(error)
        {
            console.log("error in updating the product in service layer");
            throw({error});
        }
    }

    async deleteProduct(id)
    {
        try{
            const result = await this.productRepository.deleteProduct(id);
            return result;
     }
     catch(error)
     {
         console.log("error in deleting the product in service layer");
         throw({error});
     }
    }


    async getProductById(id)
    {
        try{
              const product = await this.productRepository.getProductById(id);
              return product;
        }
        catch(error)
        {  
         console.log("error in getting product by id in service layer");
         throw({error});
        }
    }

    async searchProduct(query)
    {
        try{
                const query_result = await this.productRepository.searchProduct(query);
                return query_result;
        }
        catch(error)
        {
            console.log("Error in searching query in service layer");
            throw({error});
        }
    }
}

module.exports = ProductService;