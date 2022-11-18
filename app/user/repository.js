const User = require("./model")

// to view all users
exports.users = async ()=>{
  let users = await User.find({});
  return users;
}
// to add a new user
exports.newuser = async (user,password)=>{
  let newUser = new User(user)
  let newuser = await User.register(newUser, password);
  return newuser;
} 
// to see a particular user 
exports.userById = async (id)=>{
  let userById = await User.findById(id);
  return userById;
}
// to edit  a user 
exports.edituser = async (id, newData)=>{
  let edituser = await User.findByIdAndUpdate(id, newData)
}
// to delete and item
exports.deleteuser = async (id)=>{
  let deleteuser = User.findByIdAndRemove(id);
  return deleteuser
}

