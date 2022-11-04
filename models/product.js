const mongoose = require("mongoose");
      
const ProductSchema = new mongoose.Schema({
  prodImage: String,
  prodName: String,
  ProdDesc:String,
  prodPrice: Number,
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
  }]
})
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;