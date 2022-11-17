const mongoose = require("mongoose");
      
      
const CartSchema = new mongoose.Schema({
    
  owner: {
    id:{       
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:{
      type:String
    },   
  },
  mainItemId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
   },
   prodImage: {
    type:String
  },
   prodName: {
    type:String
  },
   prodDesc:{
    type:String
  },
   prodPrice: {
    type:Number
  },
   prodQuantity: {
    type:Number
  },
})

const Cart = mongoose.model("Cart", CartSchema)

      
module.exports = Cart;