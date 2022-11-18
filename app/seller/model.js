const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const sellerSchema = new mongoose.Schema({
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
});
sellerSchema.plugin(passportLocalMongoose)

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;