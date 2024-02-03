const VariantModel = require('../models/Variant');
const ProductModel = require("../models/Product");

class VariantRepository {
    async createVariant ({ variant_name,sku,additional_cost,stock_count,product_id })
    {
        try{ 
                const variant = new VariantModel({ variant_name,sku,additional_cost,stock_count,product_id });
                await variant.save();

                const product = await ProductModel.findById(product_id);
                product.variants.push(variant);
                await product.save();

                return variant;
        }
        catch(error)
        {
            console.log("Error while creating the variant in repository layer");
            throw({error});
        }
    }
    
    async getAllVariant()
    {
        try{
               const variants = await VariantModel.find({});
               return variants;
        }
        catch(error)
        {
            console.log("Error while getting all variant in repository layer");
            throw({error});
        }
    }  
    
    async getVariantById(id)
    {
        try{
            const variant = await VariantModel.findById(id);
            return variant;
     }
     catch(error)
     {
         console.log("Error while getting variant in repository layer");
         throw({error});
     }
    }

    async updateVariant(id,data)
    {
         try{
               const { variant_name,sku,additional_cost,stock_count,product_id } = data;
               const variant = await VariantModel.findByIdAndUpdate(id,{variant_name,sku,additional_cost,stock_count,product_id},{new:true});
               return variant;
         }
         catch(error)
         {
            console.log("Error while updating variant in repository layer");
            throw({error});
         }
    }

    async deleteVariant(id)
    {
        try{
              
              const variant = await VariantModel.findByIdAndDelete(id);
              const product_id = variant.product_id;  
              const product= await ProductModel.findById(product_id);
              await product.variants.pull(id);
              product.save();
              return true;
        }
     catch(error)
     {
         console.log("Error in deleting the variant in repository layer");
         throw({error});
     }
    }   
}
module.exports = VariantRepository;