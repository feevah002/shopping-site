const { findByIdAndDelete, findByIdAndRemove } = require("../../models/product.js");

const mongoose = require("mongoose"),
      express = require("express"),
      Product = require("../../models/product.js"),
      User = require("../../models/user.js"),
      Admin = require("../../models/admin.js"),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      flash = require("connect-flash"),
      middlewareObj = require("../../middleware"),
      router = express.Router({margeParams: true});




// admin add product form
router.get("/new", middlewareObj.adminIsLoggedIn, (req,res)=>{
  res.render("admin/meatro/new")
});

// adding
router.post("/",  middlewareObj.adminIsLoggedIn, (req, res)=>{
  const product = req.body.product
    Product.create(product, (err, added)=>{
      if(err){
        console.log(err)
      } else {
        console.log(added);
        res.redirect("/admin/meatro");
      }
    });
});

//  show page
router.get("/:pid", middlewareObj.adminIsLoggedIn, (req,res)=>{
  Product.findById(req.params.pid, (err, product)=>{
    if(err){
      console.log(err)

    } else{
      res.render("admin/meatro/show",{product:product})
    }
  });

});
//admin edit form
router.get("/:pid/edit", middlewareObj.adminIsLoggedIn, (req,res)=>{
  Product.findById(req.params.pid, (err, product)=>{
    res.render("admin/meatro/edit",{product:product})
  })
 
});


//admin edit logic
router.put("/:pid", middlewareObj.adminIsLoggedIn, (req,res)=>{
  Product.findByIdAndUpdate(req.params.pid, req.body.product, (err, product)=>{
    if(err){
      console.log(err)

    } else{
      res.redirect("/admin/meatro/")
    }
  });

});

// deleting products
router.delete("/:pid", middlewareObj.adminIsLoggedIn, (req,res)=>{
  Product.findByIdAndRemove(req.params.pid, (err)=>{
    if(err){
      res.redirect("/admin/meatro/"+req.params.pid)
    }
    else{
      res.redirect("/admin/meatro")
    }
  })
})
module.exports = router;