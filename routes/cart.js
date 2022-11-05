const mongoose = require("mongoose");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const bodyParser = require("body-parser");
const Comment = require("../models/comment.js"),
      express = require("express"),
      flash = require("connect-flash"),
      middlewareObj = require("../middleware"),
      router = express.Router({margeParams: true});

//view cart
router.get("/:uid/cart", middlewareObj.isLoggedIn, function(req, res){
  
  User.findById(req.user._id, function(err, user){
     if(err){
      console.log(err)
     }
     else{
      let total = 0;
      res.render("cart/cart",{user: user, total: total})
     }
  })
})

// add to cart
router.post("/:id/cart", middlewareObj.isLoggedIn, function(req,res, err){
   
  Product.findById(req.params.id, function(err, found){
    if(err){console.log(err)
  
    } else {
      let cart = {
        mainItemId : found._id,
        userid : req.user._id,
        prodName : found.prodName,
        prodImage: found.prodImage,
        prodDesc : found.prodDesc,
        prodPrice : found.prodPrice,
      }
      User.findById(req.user._id, function(err, foundUser){
        if(err){console.log(err); 
          res.redirect("/");
        } else{
          console.log(cart)
          foundUser.cart.push(cart);
          foundUser.save();
          res.redirect("");
        }
      })
      
    }
  })    
});
// delete an item from cart delete
router.get("/:uid/cart/:cartItemId",async function(req, res){
await User.updateOne({_id : req.user._id}, {
  $pull:{
    cart:{
      _id: req.params.cartItemId
    }
  }
})
res.redirect("/"+req.user._id+"/cart");
});

module.exports = router;