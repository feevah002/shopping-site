const Cart = require("./model")

// to view all Carts
exports.cart = async ()=>{
  let cart = await Cart.find();
  return cart;
}
// to add a new Cart
exports.newCart = async (cart)=>{
  let newCart = await Cart.create(cart);
  return newCart;
} 
// to see a particular Cart 
exports.CartById = async (id)=>{
  let cartById = await Cart.findById(id);
  return cartById;
}

// to delete and item
exports.deleteCart = async (id)=>{
  let deletecart = Cart.findByIdAndRemove(id);
  return deletecart;
}

