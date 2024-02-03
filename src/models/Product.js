const mongoose =require('mongoose');

  const newSchema = new mongoose.Schema({
    product_name: {
      type: String,
      required:true,
      unique:true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required:true
    },
    variants:[{
      type : mongoose.Types.ObjectId,
      ref:"Variant",
  }],
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const ProductModel = mongoose.model("Product", newSchema);
  module.exports =ProductModel;