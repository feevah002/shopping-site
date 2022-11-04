const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./models/product.js");
const User = require("./models/user.js");
const Comment = require("./models/comment.js"),
      express = require("express"),
      expressSession = require("express-session"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      flash = require("connect-flash"),
      methodOverride = require("method-override"),
      middlewareObj = require("./middleware"),
      app = express();
// const multer  = require('multer')
// const upload = multer({ dest: './public/uploads/' })



//connecting database
main().catch( (err)=> {
  console.log(err)
})
async function main(){
  await mongoose.connect("mongodb://localhost:27017/meatro")
}
//extra stuffs
//attatching body parser
app.use(bodyParser.urlencoded({extended:true}));
//attatching app.js to the views directory
app.set("view engine","ejs")

//attatching publice directory for css
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(expressSession({
  secret:"feevah the greatest",
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

// adding data to the datase

// Product.create({
//   prodName : "XTRA LARGE",
//   prodDesc : "i dont wanna act likeeee",
//   prodImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUZU-KmW9AjtmpKh7m8nvw7QyDLwtrCYrt2-pkBGh&s",
//   prodPrice: 3500,
// }, function (err,  created) {
//   if(err){console.log(err)}
//   else{console.log(created)}
//   })  

// clearing the db 
// Product.deleteMany({}, (err) => {
//   if (err){console.log(err)}
//   else{console.log("all prod deleted")}
// });
//routes

//root route
app.get("/", function(req, res, err){
  res.redirect("/meatro")
})
// langing page 
app.get("/meatro", function(req, res, err){
 
  Product.find({}, function(err, products){
    if(err){
      console.log(err)
    } else {
      res.render("meatro", {products: products})
    }
  })
  
})

//view cart
app.get("/meatro/:uid/cart", middlewareObj.isLoggedIn, function(req, res){
  
  User.findById(req.user._id, function(err, user){
     if(err){
      console.log(err)
     }
     else{
      let total = 0;
      res.render("cart",{user: user, total: total})
     }
  })
})

// add to cart
app.post("/meatro/:id/cart", middlewareObj.isLoggedIn, function(req,res, err){
   
  Product.findById(req.params.id, function(err, found){
    if(err){console.log(err)
  
    } else {
      let cart = {
        id : req.user._id,
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
          res.redirect("/meatro");
        }
      })
      
    }
  })    
});
// delete an item from cart delete
app.get("/meatro/:uid/cart/:cartItemId",async function(req, res){
await User.updateOne({_id : req.user._id}, {
  $pull:{
    cart:{
      _id: req.params.cartItemId
    }
  }
})
res.redirect("/meatro/"+req.user._id+"/cart");
});


//show more info about a product
app.get("/meatro/:id", function(req,res, err){
  // console.log("hi")

  Product.findById(req.params.id, function (err, product){
   
    if(err){
      console.log(err);
    } else {
        res.render("show", {product : product});
      }
    });
});

// create account
app.get("/register", function(req,res, err){
        res.render("register");
});
// create acconut logic
app.post("/register", function(req,res){
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
// User.deleteMany({}, function(err, del){
//   if(err){console.log(err)}
//   else{console.log("deleted");}
// });
//login page
app.get("/login", function(req,res, err){
  res.render("login");
});
//login logic
app.post("/login", passport.authenticate("local", {

  successRedirect:"/",
  failureRedirect: "/login"

  }), (req,res)=>{

});

//logout
app.get("/logout", (req,res,next)=>{
  req.logout(err=>{
    if(err){return next (err)}
    else{
      // req.flash()
      res.redirect("/")
    }
  });
});
 


//upload
// app.post("/upload", upload.single('image'), function(req,res, err){
//       console.log(req.body)
//       console.log(req.file);
//         res.end();
// });

//create- only for admin
// connecting to server

function isLoggedIn (req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
  }

app.listen(3000, function(err){
  console.log("server started successfully")
})