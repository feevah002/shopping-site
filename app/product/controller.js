const productRepository = require("./repository")

// getting all products
exports.getProducts = async (req, res)=>{
  try{
   let allProducts = await productRepository.products() 
   res.status(200).json({
    status: true,
    data: allProducts
   });
  } catch(err) {
      res.status(500).json({
        error:err,
        status:false,
      });
  }
}
//new form for product 
exports.newProdForm = (req,res)=>{
  res.render("new")
}
// adding a nerw product
exports.create = async (req,res)=>{
  try{
    console.log(req.body.name)
    let newProd = {
      prodName : req.body.name,
      prodImage : req.body.image,
      prodDesc : req.body.desc,
      prodPrice : req.body.price,
     }
    let addedProduct = await productRepository.newProduct(newProd)
     res.status(200).json({
      status:true,
      data:addedProduct
     })
    }
    catch(err){
      res.status(500).json({
        error:err,
        status:false,
      })
    }
}
// viewing a particular product 
exports.findById = async (req, res)=>{
  try{
    let id = req.params.id;
    let foundProduct = await productRepository.productById(id);
    res.status(200).json({
      status:true,
      data:foundProduct,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
  
}

// edit form
exports.editProdForm = (req,res)=>{
  res.render("edit");
}

//editint a product
exports.findByIdAndUpdate = async (req, res)=>{
  try{
    let id = req.params.id;
    let newData = {
      prodName : req.body.name,
      prodImage : req.body.image,
      prodDesc : req.body.desc,
      prodPrice : req.body.price,
     }
    let editedProduct = await productRepository.editProduct(id, newData);
    res.status(200).json({
      status:true,
      data:editedProduct,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
}

//deleting a product
exports.findByIdAndRename = async (req, res)=>{
  try{
    let id = req.params.id;
    let deleted = await productRepository.deleteProduct(id)
    res.status(200).json({
      status:true,
      data: deleted
    });
  } catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}