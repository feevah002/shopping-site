const passport = require("passport");
const userRepository = require("./repository")

// getting all users --- advanced
exports.getusers = async (req, res)=>{
  try{
   let allusers = await userRepository.users() 
   res.status(200).json({
    status: true,
    data: allusers
   });
  } catch(err) {
      res.status(500).json({
        error:err,
        status:false,
      });
  }
}
//new form for user 
exports.newUserForm = async (req,res)=>{
  await res.render("user/register")
}
// adding a nerw user
exports.create = async (req,res)=>{
  try{
    let newUser = {username: req.body.username}
    let password = req.body.password
    let addeduser = await userRepository.newuser(newUser, password)
     res.redirect("/meatro")
    }
    catch(err){
      res.status(500).json({
        error:err,
        status:"false",
      });
    }
}
//login user
exports.loginMiddleware = passport.authenticate("local",{
  successRedirect:'/',
  failureRedirect:"/login"
})

exports.login = (req,res)=>{    
    res.render("user/login")
}

// user profile
exports.findById = async (req, res)=>{
  try{
    let uid = req.params.uid;
    let founduser = await userRepository.userById(uid);
    res.render("user/profile")
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
}

// edit form 
exports.editUserForm = async (req,res)=>{
  try{
    let uid = req.params.uid;
    let foundUser = await userRepository.userById(uid);
    res.render("user/edit",{user:foundUser});
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}
//editing a user
exports.findByIdAndUpdate = async (req, res)=>{
  try{
    let uid = req.params.uid;
    let newData = req.body.details
    let editeduser = await userRepository.edituser(uid, newData);
    // res.redirect("/user/"+editeduser._id);
    res.redirect("/");
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}

//deleting a user --- advanced
exports.findByIdAndRemove = async (req, res)=>{
  try{
    let id = req.params.id;
    let deleted = await userRepository.deleteuser(id)
    res.status(200).json({
      status:true,
      data: deleted
    });
  } catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}