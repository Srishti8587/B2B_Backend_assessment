const ProductModel = require('../models/Product');

class ProductRepository {
    async createproduct ({ product_name, description,price})
    { 
        try{
             console.log(product_name, description,price);
             const product = new ProductModel({product_name, description,price});
             await product.save();
             return product;
        }
        catch(error)
        {
            console.log("Error in Createproduct in ProductRepository",error);
            throw({error});
        }
    }

    async getAllproduct()
    {
        try{
               const products = await ProductModel.find({});
               return products;
        }
        catch(error)
        {
             console.log("Error while getting all products in repository layer");
             throw({erorr});
        }
    }


    async updateProduct(id,data)
    {
        try{
                const {product_name,description,price} = data;
                const product = await ProductModel.findByIdAndUpdate(id,{product_name,description,price},{new:true});
                return product;
        }
        catch(error)
        {
            console.log("Error while updating the product in repository Layer");
            throw({error});
        }
    }

    async deleteProduct(id)
    {
        try{
               const product = await ProductModel.findByIdAndDelete(id);
               return true;
        }
        catch(error)
        {
            console.log("Error in deleting the product in rerepositorypo layer");
            throw({error});
        }
    }

    async getProductById(id)
    {
        try{
             const product = await ProductModel.findById(id);
             return product;
        }
        catch(error)
        {
            console.log("Error in getting product in rerepositorypo layer");
            throw({error});
        }
    }
    
}

module.exports = ProductRepository;