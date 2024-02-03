const validateCreateVariant = (req,res,next) =>{
    if(!req.body.variant_name || !req.body.sku || !req.body.additional_cost || !req.body.stock_count || !req.body.product_id) 
    {
        return res.status(400).json({
            data:{},
            success:false,
            message:"Invalid request body for creating variant",
            err:"Missing mandatory properties to create variant"
        });
    }

    next();
}

const validateUpdateVariant = (req,res,next) =>{
    if(req.body.product_id)
    {
        return res.status(400).json({
            data:{},
            success:false,
            message:"Invalid request body for update variant",
            err:"Can't change product id"
        })
    }
    next();
}

module.exports = {validateCreateVariant,validateUpdateVariant};
