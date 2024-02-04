const validateCreateProduct = (req,res,next) =>{
    if(!req.body.product_name || !req.body.price)
    {
        return res.status(400).json({
            data:{},
            success:false,
            message:"Invalid request body for creating product",
            err:"Missing mandatory properties to create product"
        });
    }

    next();
};

module.exports = {validateCreateProduct};