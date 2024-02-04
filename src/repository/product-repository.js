const ProductModel = require('../models/Product');
const VariantModel = require('../models/Variant');

class ProductRepository {
    async createproduct ({ product_name, description,price,variants})
    { 
        try{
             const product = new ProductModel({product_name, description,price});

             if(variants)
             {
                 const createdVariants = await VariantModel.create(
                    variants.map(variant => ({
                        variant_name: variant.variant_name,
                        sku: variant.sku,
                        additional_cost: variant.additional_cost,
                        stock_count: variant.stock_count,
                        product_id: product._id,
                    }))
                );
                product.variants = createdVariants.map(variant => variant._id);
             }
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
            console.log("Error in deleting the product in repository layer");
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


    async searchProduct(query)
    {
        try{
               
                const searched_products = await ProductModel.find({
                 $or:  [ {product_name:{$regex: query , $options:'i'},
                    description : {$regex : query , $options:'i'}}]
                });
               

                const variantIds = await VariantModel.find({
                    variant_name:{$regex : query,$options:'i'}
                });
               
                const productIds = searched_products.map(product => product.id);
                
                
                const variantsProduct = await VariantModel.find({
                     product_id :{$in :[productIds]}
                });
                const result = [...variantIds,...variantsProduct];
                return result;
        }
        catch(error)
        {
            console.log("Error while searching in repository layer");
            throw({error});
        }
    }
    
}

module.exports = ProductRepository;