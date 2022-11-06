const mongoose = require("mongoose");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const bodyParser = require("body-parser");
const Comment = require("../models/comment.js"),
      Cart = require("../models/cart.js"),
      express = require("express"),
      flash = require("connect-flash"),
      middlewareObj = require("../middleware"),
      router = express.Router({margeParams: true});

//view cart
router.get("/:uid/cart", middlewareObj.isLoggedIn, function(req, res){
  
  Cart.find({}, function(err, cart){
     if(err){
      console.log(err)
     }
     else{
      let total = 0;
      res.render("cart/cart",{cart: cart, total: total})
     }
  })
})

// add to cart
router.post("/:uid/cart/:pid/", middlewareObj.isLoggedIn, function(req,res, err){
   
  Product.findById(req.params.pid, function(err, found){
    if(err){console.log(err)
  
    } else {
      
      User.findById(req.user._id,  function(err, foundUser){
      let prodQuantity = 1;
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
      if(err){console.log(err); 
          res.redirect("/");
      } else{
        Cart.create(createCart, function(err, created){
          if(err){
            console.log(err)
          } else{
            console.log(created)
            res.redirect("/")
          }
        });    
        }
      });
    }
  });
});
// delete an item from cart delete
router.delete("/:uid/cart/:mainItemId", function(req, res){
  Cart.deleteMany({mainItemId: req.params.mainItemId}, (err)=>{
    if(err){
      console.log(err)
    } else {
      res.redirect("/meatro/"+req.user._id+"/cart");
    }
  })

});

module.exports = router;