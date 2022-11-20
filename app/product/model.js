const mongoose = require("mongoose");
      
const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name:{
    type: String,
  },
  description:{
    type: String,
  },
  price: {
    type: Number,
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
  }]
})
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;