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
      //requiring routes
const cartRoutes = require("./routes/cart");
const indexRoutes = require("./routes/index");
const meatroRoutes = require("./routes/meatro");
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


app.use("/meatro", cartRoutes)
app.use("/meatro", meatroRoutes)
app.use( indexRoutes)


const PORT = 3000
app.listen(PORT, (err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("server started succeccfully")
  }
})