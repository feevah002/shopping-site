const Cart = require("./model");
let populateQuery = [{
  path:"items.userId",
  select: " username "

},{
  path:"items.productId",
  select: " prodPrice"
}]
exports.cart = async ()=>{
  let cartItems = await Cart.find({}).populate(populateQuery)
  return cartItems[0];
}

exports.addItem = async (item)=>{
   let newItem = await Cart.create(item);
   return newItem
}
