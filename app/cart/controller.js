const cartRepository = require("./repository")

// getting all Cart
exports.getCart = async (req, res)=>{
  try{
    console.log(allCart)
   let allCart = await cartRepository.cart() 
   res.status(200).json({
    status: true,
    data: allCart
   });
  } catch(err) {
      res.status(500).json({
        status:false,
        error:err,
 
      });
  }
}

// adding a new item Cart
exports.create = async (req,res)=>{
  try{
    let createCart = {
      owner: {
        id: req.user._id,
        username: foundUser.username,
      },
      mainItemId:  found._id,
      prodImage: found.prodImage,
      prodName: found.prodName,
      prodDesc : found.prodDesc,
      prodPrice : found.prodPrice,
      prodQuantity: prodQuantity,
      }
    let addedCart = await cartRepository.newCart(newProd)
     res.status(200).json({
      status:true,
      data:addedCart
     })
    }
    catch(err){
      res.status(500).json({
        error:err,
        status:false,
      })
    }
}
// viewing a particular Cart  item
exports.findById = async (req, res)=>{
  try{
    let id = req.params.id;
    let foundCart = await cartRepository.CartById(id);
    res.status(200).json({
      status:true,
      data:foundCart,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
  
}

//deleting a Cart item
exports.findByIdAndRemove = async (req, res)=>{
  try{
    let deleted = await cartRepository.deleteCart(id)
    res.status(200).json({
      status:true,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
}