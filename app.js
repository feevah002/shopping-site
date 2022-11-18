const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./app/user/model");
const Seller = require("./app/seller/model"),
      express = require("express"),
      expressSession = require("express-session"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      flash = require("connect-flash"),
      methodOverride = require("method-override"),
      app = express();
      //requiring routes
// const cartRoutes = require("./routes/user/cart");
// const indexRoutes = require("./routes/user/index");
// const meatroRoutes = require("./routes/user/meatro");

//admin routes
// const adminRoutes = require("./routes/admin/index");
// const adminMeatroRoutes = require("./routes/admin/meatro");
// const multer  = require('multer')
// const upload = multer({ dest: './public/uploads/' })


// emitter.setMaxListeners(1)
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
app.use(bodyParser.json());
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
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new LocalStrategy(Seller.authenticate()))
passport.use(new LocalStrategy(Seller.authenticate()))
passport.serializeUser(Seller.serializeUser())
passport.deserializeUser(Seller.deserializeUser())



app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})


// app.use("/admin/meatro", adminRoutes)
// app.use("/admin/meatro", adminMeatroRoutes)
// app.use("/meatro", cartRoutes)
// app.use("/meatro", meatroRoutes)
// app.use( indexRoutes)
const productRoutes = require("./app/product/routes")
const cartRoutes = require("./app/cart/routes");
const userRoutes = require("./app/user/routes");
const sellerRoutes = require("./app/seller/routes");

app.use( "/",productRoutes)
app.use(cartRoutes)
app.use(userRoutes)
app.use(sellerRoutes)

app.get("/logout", (req,res,next)=>{
  req.logout(err=>{
    if(err){return next (err)
    } else {
      // req.flash()
      res.redirect("/")
    }
  });
});
// Cart.create({
//   prodName : "XTRA LARGE",
//   prodDesc : "i dont wanna act likeeee",
//   prodImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUZU-KmW9AjtmpKh7m8nvw7QyDLwtrCYrt2-pkBGh&s",
//   prodPrice: 3500,
// }, function (err,  created) {
//   if(err){console.log(err)}
//   else{console.log(created)}
//   })   
// User.deleteMany({}, (err) => {
//   if (err){console.log(err)}
//   else{console.log("all prod deleted")}
// });

    


const PORT = 3010
app.listen(PORT, (err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("server started succeccfully")
  }
})