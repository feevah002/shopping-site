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

// root routes

//admin - home
router.get("/", (req,res)=>{
  Product.find({}, (err, products)=>{
    if(err){console.log(err)
    }else{
      res.render("admin/index",{products: products});
    }
  })
 
})

// login form 
router.get("/login", (req,res)=>{
  res.render("admin/users/login")
})

//login logic
router.post("/login", passport.authenticate("local",{
  successRedirect:"/admin/meatro",
  faliureRedirect:"/admin/meatro/login"
}),(req,res)=>{

})

//register form
router.get("/register", (req,res)=>{
  res.render("admin/users/register")
})

//register logic
router.post("/register", (req,res)=>{
  const username = new User ({username: req.body.username});
  User.register(username, req.body.password, (err, newUser)=>{
    if(err){
      console.log(err)
      res.redirect("/admin/meatro/register");
    } else{
      passport.authenticate("local")(req,res,()=>{
        res.redirect("/admin/index")
      })
    }
  });
});




      
module.exports = router;