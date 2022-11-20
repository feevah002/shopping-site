const Cart = require("./model");
let populateQuery = [{
  path:"items.userId",
  select: "username "

},{
  path:"items.productId",
  select: "name price"
},
,{
  path:"userId",
  select: "username"
}]
exports.cart = async ()=>{
  let cart = await Cart.find({}).populate(populateQuery)
  // let loggedUserCart =  allCreatedcarts.find(cart => cart.userId.id == currentUser._id)

  // console.log(loggedUserCart)
  return cart;
}

exports.addItem = async (item)=>{
   let newItem = await Cart.create(item);
   return newItem
}
