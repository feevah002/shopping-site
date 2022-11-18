const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type:String
  },
  password: {
    type:String
  },
  firstName: {
    type:String
  },
  middleName: {
    type:String
  },
  lastName: {
    type:String
  },
  address: {
    type:String
  },
  number: {
    type:String
  },
  productBought:[{
    name:{
      type:String
    },
    price:{
      type:String
    },
  }],
  cart:[{
    id:{type:mongoose.Schema.Types.ObjectId,}
  }],
});
UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema);
module.exports = User;