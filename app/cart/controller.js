const cartRepository = require("./repository")
const Cart = require("./model")
// getting all Cart
exports.getCart = async (req, res)=>{
  try{
    
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
    let cartItem = {
      owner: {
        id: req.user._id,
        username: req.user.username,
      },
      mainItemId:  product._id,
      prodImage: product.prodImage,
      prodName: product.prodName,
      prodDesc : product.prodDesc,
      prodPrice : product.prodPrice,
      prodQuantity: 1,
      }
    
    let addedCart = await cartRepository.newCart(cartItem)
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
    let pid = req.params.pid;
    let foundCart = await cartRepository.CartById(pid);
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
    let pid = req.params.pid
    let deleted = await cartRepository.deleteCart(pid)
    res.status(200).json({
      status:true,
      data: deleted,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}