const sellerRepository = require("./repository")
const ppassport = require("passport");
// getting all Sellers
exports.getSellers = async (req, res)=>{
  try{
   let allSellers = await sellerRepository.sellers() 
   res.status(200).json({
    status: true,
    data: allSellers
   });
  } catch(err) {
      res.status(500).json({
        error:err,
        status:false,
      });
  }
}
//new form for Seller 
exports.newSellerForm = async (req,res)=>{
  await res.render("register")
}
// adding a nerw Seller
exports.create = async (req,res)=>{
  try{

    let newSeller = {username: req.body.username}
    let password = req.body.password
    let addedSeller = await sellerRepository.newSeller(newSeller, password)

     res.status(200).json({
      status:true,
      data:addedSeller
     });
    }
    catch(err){
      res.status(500).json({
        error:err,
        status:"false",
      });
    }
}

//login seller
exports.loginMiddleware = ppassport.authenticate("local",{
  successRedirect:"/",
  faliureRedirect:"/login"
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
// viewing a particular Seller 
exports.findById = async (req, res)=>{
  try{
    let id = req.params.id;
    let foundSeller = await sellerRepository.sellerById(id);
    res.status(200).json({
      status:true,
      data:foundSeller,
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
exports.editSellerForm = (req,res)=>{
  res.render("edit");
}

//editing a Seller
exports.findByIdAndUpdate = async (req, res)=>{
  try{
    let id = req.params.id;
    let newData = {
      Sellername : req.body.Sellername,
      password : req.body.password,
     }
    let editedSeller = await sellerRepository.editSeller(id, newData);
    res.status(200).json({
      status:true,
      data:editedSeller,
    });
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}

//deleting a Seller
exports.findByIdAndRemove = async (req, res)=>{
  try{
    let id = req.params.id;
    let deleted = await sellerRepository.deleteSeller(id)
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