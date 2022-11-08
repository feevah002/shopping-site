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


router.get("/", (req, res)=>{
  res.redirect("/admin/meatro/home");
});

// login form 
router.get("/login", (req,res)=>{
  res.render("admin/users/login")
})

//login logic
router.post("/login", passport.authenticate("local",{
  successRedirect:"/admin/meatro/home",
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
//admin - home
router.get("/home", (req,res)=>{
  Product.find({}, (err, products)=>{
    if(err){console.log(err)
    }else{
      res.render("admin/index",{products: products});
    }
  })
 
})

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


      
module.exports = router;