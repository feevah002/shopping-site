const mongoose = require("mongoose");
      
      
const CartSchema = new mongoose.Schema({
    
  owner: {
    id:{
            
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String,   
  },
  mainItemId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
   },
   prodImage: String,
   prodName: String,
   prodDesc:String,
   prodPrice: Number,
   prodQuantity: Number,
})

const Cart = mongoose.model("Cart", CartSchema)

      
module.exports = Cart;