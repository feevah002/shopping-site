const mongoose = require("mongoose");
      
const ProductSchema = new mongoose.Schema({
  prodImage: {
    type: String,
  },
  prodName:String,
  prodDesc:{
    type: String,
  },
  prodPrice: {
    type: Number,
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
  }]
})
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;