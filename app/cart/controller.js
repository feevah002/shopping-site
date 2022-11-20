const cartRepository = require('./repository')
const productRepository = require('../product/repository');


exports.getCart = async (req,res)=>{

  try{
    let userId = req.user.id
    let allUsersCart = await cartRepository.cart();
    let cart =  allUsersCart.find(cart => cart.userId.id == userId)

 
    if(!cart){
      res.status(400).json({
        type:"invalid",
        msg:"cart not found",
      })
    } else{
      // res.status(200).json({
      //   status: true,
      //   data:cart
      // })
      res.render("user/cart",{cart: cart})
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
    let userId = req.user.id
    let productId = req.params.pid
    let quantity = Number.parseInt(req.body.quantity)
    // getting all cart
    let allUsersCart = await cartRepository.cart();
    //searching for the logged in user's cart
    let cart = allUsersCart.find(cart => cart.userId.id == userId)
   
   

 
   
    let productDetails = await productRepository.productById(productId)
    if(!productDetails){
      res.status(500).json({
        staus:false,
        msg:"item not found"
      });
    }
  
    if(cart){
     let indexFound = cart.items.findIndex(item => item.productId._id == productId && item.userId.id == userId)
      

 
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
        cart.items[indexFound].price = productDetails.price;
        cart.items[indexFound].total = cart.items[indexFound].price * cart.items[indexFound].quantity;
        cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total + num)
      }
      else if(quantity > 0){
        
        cart.items.push({
          userId: req.user._id,
          productId: productId,
          price : productDetails.price,
          quantity: quantity,
          total: parseInt(quantity * productDetails.price)
        })
        cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total+num)
      } else {
        return res.status(400).json({
            type: "Invalid",
            msg: "Invalid request(quantity can not be '0')"
        })
    }
  let data = await cart.save()
    // res.status(200).json({
    //     type: "success",
    //     mgs: "Process Successful",
    //     data: data
    // })
    res.redirect(`/meatro/${userId}/cart`)
  }else{
  
    let cartItem = {items:[{
      userId: userId,
      productId: productId,
      price : productDetails.price,
      quantity: quantity,
      total: parseInt(quantity* productDetails.price)
    }],
    userId: userId,    
    subTotal: parseInt(quantity * productDetails.price),
    }
    cart = await cartRepository.addItem(cartItem)
    // res.json(cart)
    res.redirect(`/meatro/${userId}/cart`)
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
        // userId = req.user._id;
        // let delItems= cart.items.map(item=> item.userId)
        // if(delItems == req.user._id){

        // }

        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        // res.status(200).json({
        //     type: "success",
        //     mgs: "Cart Has been emptied",
        //     data: data
        // })
        res.ridirect(`/meatro/${req.user._id}/cart`)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}






























































































































































































































































































































































































// const cartRepository = require('./repository')
// const productRepository = require('../product/repository');


// exports.getCart = async (req,res)=>{
//   try{

//     let cart = await cartRepository.cart();
 
//     if(!cart){
//       res.status(400).json({
//         type:"invalid",
//         msg:"cart not found",
//       })
//     } else{
//       // res.status(200).json({
//       //   status: true,
//       //   data:cart
//       // })
//       res.render("user/cart",{cart: cart})
//     }
//   } catch(err){
   
//     res.status(500).json({
//       status: false,
//       msg: "something went wrong",
//       err:err
//     })
//   }
// }

// exports.addItemToCart = async (req, res) => {
//   try{
//     let userId = req.user.id
//     let productId = req.params.pid
//     let quantity = Number.parseInt(req.body.quantity)
//     let cart = await cartRepository.cart();
//     let a = cart.forEach(t => {
//       console.log(t.userId.id)
//     });
    
//     let productDetails = await productRepository.productById(productId)
//     if(!productDetails){
//       res.status(500).json({
//         staus:false,
//         msg:"item not found"
//       });
//     }
//     cart.forEach(cart =>{})
//     if(cart && cart.userId.id == userId){
//      let indexFound = cart.items.findIndex(item => item.productId._id == productId && item.userId.id == userId)
      

 
//     //  - 1 was used here because when an item is not in the array it returns the index as -1
//       if(indexFound !== -1 && quantity <= 0 ){
//           cart.items.splice(indexFound, 1)
//           if(cart.items.length == 0){
//             cart.subTotal = 0
//           } else {
//             cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total+num)
      
//           }  
//       }
//       else if (indexFound !== -1){

//         cart.items[indexFound].quantity =  cart.items[indexFound].quantity + quantity;
//         cart.items[indexFound].price = productDetails.price;
//         cart.items[indexFound].total = cart.items[indexFound].price * cart.items[indexFound].quantity;
//         cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total + num)
//       }
//       else if(quantity > 0){
        
//         cart.items.push({
//           userId: req.user._id,
//           productId: productId,
//           price : productDetails.price,
//           quantity: quantity,
//           total: parseInt(quantity * productDetails.price)
//         })
//         cart.subTotal = cart.items.map(item=> item.total).reduce((total, num)=> total+num)
//       } else {
//         return res.status(400).json({
//             type: "Invalid",
//             msg: "Invalid request(quantity can not be '0')"
//         })
//     }
//   let data = await cart.save()
//     // res.status(200).json({
//     //     type: "success",
//     //     mgs: "Process Successful",
//     //     data: data
//     // })
//     res.redirect(`/meatro/${userId}/cart`)
//   }else{
  
//     let cartItem = {items:[{
//       userId: userId,
//       productId: productId,
//       price : productDetails.price,
//       quantity: quantity,
//       total: parseInt(quantity* productDetails.price)
//     }],
//     userId: userId,    
//     subTotal: parseInt(quantity * productDetails.price),
//     }
//     cart = await cartRepository.addItem(cartItem)
//     // res.json(cart)
//     res.redirect(`/meatro/${userId}/cart`)
//   }

// } catch (err) {
//   console.log(err)
//   res.status(400).json({
//       type: "Invalid",
//       msg: "Something Went Wrong",
//       err: err
//   })
// }
// }


// exports.emptyCart = async (req, res) => {
//     try {
//         // userId = req.user._id;
//         // let delItems= cart.items.map(item=> item.userId)
//         // if(delItems == req.user._id){

//         // }

//         let cart = await cartRepository.cart();
//         cart.items = [];
//         cart.subTotal = 0
//         let data = await cart.save();
//         // res.status(200).json({
//         //     type: "success",
//         //     mgs: "Cart Has been emptied",
//         //     data: data
//         // })
//         res.ridirect(`/meatro/${req.user._id}/cart`)
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({
//             type: "Invalid",
//             msg: "Something Went Wrong",
//             err: err
//         })
//     }
// }

























































































