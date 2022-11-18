const passport = require("passport");
const userRepository = require("./repository")

// getting all users
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
  await res.render("new")
}
// adding a nerw user
exports.create = async (req,res)=>{
  try{
    let newUser = {username: req.body.username}
    let password = req.body.password
    let addeduser = await userRepository.newuser(newUser, password)
    console.log(addeduser)
     res.status(200).json({
      status:true,
      data:addeduser
     });
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
  failureRedirect:"/failed"
})

exports.login = (req,res)=>{
  try{
    let user = req.body.username;
    res.status(200).json({
       status: true,
       user: username,
       message: "login sucessful"
    })
  } catch(err){
    res.status(500).json({
      status:false,
      error:err
    })
  }
}
// viewing a particular user 
exports.findById = async (req, res)=>{
  try{
    let id = req.params.id;
    let founduser = await userRepository.userById(id);
    res.status(200).json({
      status:true,
      data:founduser,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:true,
    });
  }
}

// edit form
exports.editUserForm = (req,res)=>{
  res.render("edit");
}

//editing a user
exports.findByIdAndUpdate = async (req, res)=>{
  try{
    let id = req.params.id;
    let newData = {
      username : req.body.username,
      password : req.body.password,
     }
    let editeduser = await userRepository.edituser(id, newData);
    res.status(200).json({
      status:true,
      data:editeduser,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}

//deleting a user
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