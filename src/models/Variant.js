const mongoose =require('mongoose');

  const newSchema = new mongoose.Schema({
    variant_name: {
      type: String,
      required:true
    },
    sku: {
      type: String,
      required:true,
      unique:true
    },
    additional_cost: {
      type: Number,
      required:true
    },
    stock_count:{
        type:Number,
        required:true
    },
    product_id:{
        type :mongoose.Types.ObjectId,
        ref:"Product",
        require : [true,"Product_id is required"]
     },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const VariantModel = mongoose.model("Variant", newSchema);
  module.exports = VariantModel;