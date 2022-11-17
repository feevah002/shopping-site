const Product = require("./model")

// to view all products
exports.products = async ()=>{
  let products = await Product.find({});
  return products;
}
// to add a new product
exports.newProduct = async (product)=>{
  let newProduct = await Product.create(product);
  return newProduct;
} 
// to see a particular product 
exports.productById = async (id)=>{
  let productById = await Product.findById(id);
  return productById;
}
// to edit  a product 
exports.editProduct = async (id, newData)=>{
  let editProduct = await Product.findByIdAndUpdate(id, newData)
}
// to delete and item
exports.deleteProduct = async (id)=>{
  console.log(id)
  let deleteProduct = Product.findByIdAndRemove(id);
  return deleteProduct
}

