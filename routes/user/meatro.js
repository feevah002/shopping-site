const mongoose = require("mongoose");
const Product = require("../../models/product.js");
const User = require("../../models/user.js");
const bodyParser = require("body-parser");
const Comment = require("../../models/comment.js"),
      express = require("express"),
      passport = require("passport"),
      flash = require("connect-flash"),
      middlewareObj = require("../../middleware"),
      router = express.Router({margeParams: true});
      

// langing page 
router.get("/", function(req, res, err){

  Product.find({}, function(err, products){
    if(err){
      console.log(err)
    } else {
      res.render("user/meatro/index", {products: products})
    }
  })
  
})



//show more info about a product
router.get("/:id", function(req,res, err){
  // console.log("hi")

  Product.findById(req.params.id, function (err, product){
   
    if(err){
      console.log(err);
    } else {
      console.log(product)
        res.render("user/meatro/show", {product : product});
      }
    });
});

module.exports = router;