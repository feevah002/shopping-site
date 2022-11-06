const mongoose = require("mongoose"),
     passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  middleName: String,
  lastName: String,
  address: String,
  number: String,
  productBought:[{
    name:String,
    price:String
  }],
  cart:[{
   userid:{
    type: mongoose.Schema.Types.ObjectId,
   },
  
  }],
  amountToBePaid: String,
  amountPaid: String,
});
UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema);
module.exports = User;