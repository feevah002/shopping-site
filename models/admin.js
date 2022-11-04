const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  orders: [{
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      },
    username:String,
    phoneNumber:String,
    email:String,
    productBought:[{
      Productname:String,
      productPrice: String,
      productAmount: String,
      paidAmount: String,
      }],
    totalAmountOfProduct: String,
    amountPaidInTotal: String,
    }],
});
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;