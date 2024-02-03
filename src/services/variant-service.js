const VariantRepository = require("../repository/variant-repository");

class VariantService {
  constructor() {
    this.variantrepository = new VariantRepository();
  }

  async createVariant(data) {
    try {
      const variant = await this.variantrepository.createVariant(data);
      return variant;
    } catch (error) {
      console.log("Error in creating variant at service layer");
      throw error;
    }
  }

  async getAllVariant()
  {
    try {
      const variant = await this.variantrepository.getAllVariant();
      return variant;
    } catch (error) {
      console.log("Error in getting variant at service layer");
      throw error;
    }
  }

  async getVariantById(id)
  {
    try {
      const variant = await this.variantrepository.getVariantById(id);
      return variant;
    } catch (error) {
      console.log("Error in getting variant by id at service layer");
      throw error;
    }
  }

  async updateVariant(id,data)
  {
    try{
          const variant = await this.variantrepository.updateVariant(id,data);
          return variant;
    }
    catch(error)
    {
      console.log("Error in getting variant by id at service layer");
      throw error;
    }
  }

  async deleteVariant(id)
  {
      try{
          const result = await this.variantrepository.deleteVariant(id);
          return result;
   }
   catch(error)
   {
       console.log("error in deleting the variant in service layer");
       throw({error});
   }
  }
}


module.exports = VariantService;

