const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user.js"),
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
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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
const Cart = require("./app/cart/model")
const cartRoutes = require("./app/cart/routes");

app.use( productRoutes)
app.use("/",cartRoutes)


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