const VariantService = require('../services/variant-service');

const variantservice = new VariantService();

const createVariant = async (req,res)=>{
    try{
            const variant = await variantservice.createVariant(req.body);
            return  res.status(201).json({
                data:variant,
                success:true,
                message:"Successfully created variant"
            });
    }
    catch(error)
    {
        console.log("Error in controllers while creating variant");
        return res.status(404).json({
          data: {},
          success: false,
          message: "Not able to create variant",
          err: error,
        });
    }
};

const getAllVariant = async (req,res) =>{
    try{
         const variants = await variantservice.getAllVariant();
         return  res.status(201).json({
            data:variants,
            success:true,
            message:"Successfully got all variant"
        });
    }
    catch(error)
    {
        console.log("Error in getting all variant");
        return res.status(404).json({
            data: {},
            success: false,
            message: "Not able to get variant",
            err: error,
          });
    }
};

const getVariantById = async (req,res) =>{
    try{
            const variants = await variantservice.getVariantById(req.params.id);
            if(!variants)
            {
                return res.status(500).json({
                    data:variants,
                    success:false,
                    message:"No such variant exists"
                });
            }
            
            return  res.status(201).json({
            data:variants,
            success:true,
            message:"Successfully got variant by id"
        });
    }
    catch(error)
    {
        console.log("Error in getting variant by id");
        return res.status(404).json({
            data: {},
            success: false,
            message: "Not able to get variant",
            err: error,
          });
    }
};

const updateVariant = async (req,res) =>{
    try{
          const new_variant = await variantservice.updateVariant(req.params.id,req.body);
          return res.status(200).json({
            data:new_variant,
            success:true,
            message:"Successfully updated variant"
          });
    }
    catch(error)
    {
        console.log("Error in updating variant");
        return res.status(404).json({
            data: {},
            success: false,
            message: "Not able to update variant",
            err: error,
          });
    }
};

const deleteVariant = async (req,res) =>{
    try{
         const result = await variantservice.deleteVariant(req.params.id);
         return res.status(201).json({
          success: true,
          message: "Successfully deleted variant",
        });
    }
    catch(error)
    {
      console.log("Error in controllers while delete variant");
      return res.status(404).json({
        success: false,
        message: "Not able to delete variant",
        err: error,
      });
    }
  };

module.exports = { createVariant, getAllVariant, getVariantById, updateVariant, deleteVariant};