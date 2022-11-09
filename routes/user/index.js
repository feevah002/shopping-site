const mongoose = require("mongoose"),
      express = require("express"),
      Product = require("../../models/product.js"),
      User = require("../../models/user.js"),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      flash = require("connect-flash"),
      router = express.Router({margeParams: true});
      

//root route
router.get("/", function(req, res, err){
  res.redirect("/meatro")
})

// create account
router.get("/register", function(req,res, err){
  res.render("user/users/register");
});

// create acconut logic
router.post("/register", function(req,res){
let newuser = new User({username: req.body.username})
  User.register(newuser, req.body.password,(err, user)=>{
    if(err){
    // req.flash("")
      console.log(err)
        return res.redirect("/register")
    } else {
      passport.authenticate("local")(req,res, function(){
        // req.flash("success", "Welcome to Yelpcamp"+ user.username+", nice to meet you")
        // console.log(req.user);
        res.redirect("/")
      });
    }
  });
});

//login page
router.get("/login", function(req,res, err){
res.render("user/users/login");
});

//login logic
router.post("/login", passport.authenticate("local", {
  successRedirect:"/",
  failureRedirect: "/login"
  }), (req,res)=>{
});

//logout
router.get("/logout", (req,res,next)=>{
  req.logout(err=>{
    if(err){return next (err)
    } else {
      // req.flash()
      res.redirect("/")
    }
  });
});


module.exports = router;