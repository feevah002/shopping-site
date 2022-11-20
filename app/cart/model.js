const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  productId :{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  b:{
    type:String
  },
  quantity:{
    type: Number,
  },
  price:{
    type:Number,
  },
  total:{
    type:Number,
  },
}, {
  timestamps:true
})
const CartSchema = Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  items:[ItemSchema],
  subTotal:{
    default:0,
    type: Number,
   
  }
},{
  timestamps: true
}) 

module.exports = mongoose.model('Cart', CartSchema);











































































      
// const CartSchema = new mongoose.Schema({
    
//   owner: {
//     id:{       
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"User"
//     },
//     username:{
//       type:String
//     },   
//   },
//   mainItemId:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref:"Product"
//    },
//    prodImage: {
//     type:String
//   },
//    prodName: {
//     type:String
//   },
//    prodDesc:{
//     type:String
//   },
//    prodPrice: {
//     type:Number
//   },
//    prodQuantity: {
//     type:Number
//   },
// })

// const Cart = mongoose.model("Cart", CartSchema)

      
// module.exports = Cart;