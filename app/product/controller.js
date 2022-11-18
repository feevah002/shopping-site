const productRepository = require("./repository")

// getting all products - user
exports.getProducts = async (req, res)=>{
  try{
   let allProducts = await productRepository.products() 
   res.render("product/index",{products: allProducts})
  } catch(err) {
      res.status(500).json({
        error:err,
        status:false,
      });
  }
}

//new form for product 
exports.newProdForm = (req,res)=>{
  res.render("product/new")
}
// adding a nerw product
exports.create = async (req,res)=>{
  try{
    let newProd = req.body.product;
    let addedProduct = await productRepository.newProduct(newProd)
     res.redirect("/admin/meatro/"+addedProduct._id)
    }
    catch(err){
  
      res.status(500).json({
        error:err,
        status:false,
      })
    }
}
// viewing a particular product - user
exports.findById = async (req, res)=>{
  try{
    let pid = req.params.pid;
    let foundProduct = await productRepository.productById(pid);
    res.render('product/show',{product: foundProduct})
  } catch(err) {
    res.status(500).json({
      error:err,
      status:true,
    });
  }
  
}


// edit form
exports.editProdForm = async (req,res)=>{
  try{
    let pid = req.params.pid;
    let foundProduct = await productRepository.productById(pid);
    res.render("product/edit",{product: foundProduct});

  } catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
}

//editint a product
exports.findByIdAndUpdate = async (req, res)=>{
  try{
    let pid = req.params.pid;
    let newData = req.body.product

    let editedProduct = await productRepository.editProduct(pid, newData);   
    res.redirect("/seller/meatro/" + pid)
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
}

//deleting a product
exports.findByIdAndRemove = async (req, res)=>{
  try{
    let pid = req.params.pid;
    let deleted = await productRepository.deleteProduct(pid)
    res.redirect("/seller")
  } catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}