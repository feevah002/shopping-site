const cartRepository = require('./repository')
const productRepository = require('../product/repository');


exports.getCart = async (req,res)=>{
  try{

    let cart = await cartRepository.cart();
 
    if(!cart){
      res.status(400).json({
        type:"invalid",
        msg:"cart not found",
      })
    } else{
      res.status(200).json({
        status: true,
        data:cart
      })
    }
  } catch(err){
   
    res.status(500).json({
      status: false,
      msg: "something went wrong",
      err:err
    })
  }
}

exports.addItemToCart = async (req, res) => {
  try{
    console.log(req.params.uid)
    let userId = req.params.uid
    let productId = req.body.productId
    let quantity = Number.parseInt(req.body.quantity)
    let cart = await cartRepository.cart();
    let productDetails = await productRepository.productById(productId)
    if(!productDetails){
      res.status(500).json({
        staus:false,
        msg:"item not found"
      });
    }
    if(cart){
     let indexFound = cart.items.findIndex(item => item.productId._id == productId)
 
    //  - 1 was used here because when an item is not in the array it returns the index as -1
      if(indexFound !== -1 && quantity <= 0 ){
          cart.items.splice(indexFound, 1)
          if(cart.items.length == 0){
            cart.subTotal = 0
          } else {
            cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total+num)
      
          }  
      }
      else if (indexFound !== -1){
        
       
        cart.items[indexFound].quantity =  cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].price = productDetails.prodPrice;
        cart.items[indexFound].total = cart.items[indexFound].price * cart.items[indexFound].quantity;
        cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total + num)
      }
      else if(quantity > 0){
        
        cart.items.push({
          userId: req.params.uid,
          productId: productId,
          price : productDetails.prodPrice,
          quantity: quantity,
          total: parseInt(quantity * productDetails.prodPrice)
        })
        cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total+num)
      } else {
        return res.status(400).json({
            type: "Invalid",
            msg: "Invalid request(quantity can not be '0')"
        })
    }
  let data = await cart.save()
    res.status(200).json({
        type: "success",
        mgs: "Process Successful",
        data: data
    })
  }else{
  
    let cartItem = {items:[{
      userId: req.params.uid,
      productId: productId,
      price : productDetails.prodPrice,
      quantity: quantity,
      total: parseInt(quantity* productDetails.prodPrice)
    }],
    subTotal: parseInt(quantity * productDetails.prodPrice),
    }
    cart = await cartRepository.addItem(cartItem)
      res.json(cart)
  }

} catch (err) {
  console.log(err)
  res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err
  })
}
}


exports.emptyCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart Has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}


























































































// // getting all Cart
// exports.getCart = async (req, res)=>{
//   try{
    
//    let allCart = await cartRepository.cart() 
  
//    res.render("user/cart",{cart:allCart});



//   } catch(err) {
    
//       res.status(500).json({
//         status:false,
//         error:err,
 
//       });
//   }
// }

// // adding a new item Cart
// exports.create = async (req,res)=>{
//   try{
//     let cartItem = {
//       owner: {
//         id: req.user._id,
//         username: req.user.username,
//       },
//       mainItemId:  product._id,
//       prodImage: product.prodImage,
//       prodName: product.prodName,
//       prodDesc : product.prodDesc,
//       prodPrice : product.prodPrice,
//       prodQuantity: 1,
//       }
    
//     let addedCart = await cartRepository.newCart(cartItem)
//      res.status(200).json({
//       status:true,
//       data:addedCart
//      })
//     }
//     catch(err){
//       res.status(500).json({
//         error:err,
//         status:false,
//       })
//     }
// }
// // viewing a particular Cart  item
// exports.findById = async (req, res)=>{
//   try{
//     let pid = req.params.pid;
//     let foundCart = await cartRepository.CartById(pid);
//     res.status(200).json({
//       status:true,
//       data:foundCart,
//     });
//   }
//   catch(err){
//     res.status(500).json({
//       error:err,
//       status:true,
//     });
//   }
  
// }

// //deleting a Cart item
// exports.findByIdAndRemove = async (req, res)=>{
//   try{
//     let pid = req.params.pid
//     let deleted = await cartRepository.deleteCart(pid)
//     res.status(200).json({
//       status:true,
//       data: deleted,
//     });
//   }
//   catch(err){
//     res.status(500).json({
//       error:err,
//       status:false,
//     });
//   }
// }