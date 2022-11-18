const Seller = require("./model")

// to view all Sellers
exports.sellers = async ()=>{
  let Sellers = await Seller.find({});
  return Sellers;
}
// to add a new Seller
exports.newSeller = async (seller, password)=>{
  let newSeller = new Seller(seller)
  let regSeller = await Seller.register(newSeller, password);
  return regSeller;
} 
// to see a particular Seller 
exports.sellerById = async (id)=>{
  let sellerById = await Seller.findById(id);
  return sellerById;
}
// to edit  a Seller 
exports.editSeller = async (id, newData)=>{
  let editSeller = await Seller.findByIdAndUpdate(id, newData)
}
// to delete and item
exports.deleteSeller = async (id)=>{
  let deleteSeller = Seller.findByIdAndRemove(id);
  return deleteSeller
}

