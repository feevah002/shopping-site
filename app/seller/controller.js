const sellerRepository = require("./repository")
const passport = require("passport");
const productRepository = require("../product/repository")

// getting sellers index --advanced
exports.getSellersIndex = async (req, res)=>{
  try{
    let allProducts = await productRepository.products() 
   res.render('seller/index', {products: allProducts})

  } catch(err) {
      res.status(500).json({
        error:err,
        status:false,
      });
  }
}
//new form for Seller 
exports.newSellerForm = async (req,res)=>{
  await res.render("seller/register")
}
// adding a nerw Seller
exports.create = async (req,res)=>{
  try{

    let newSeller = {username: req.body.username}
    let password = req.body.password
    let addedSeller = await sellerRepository.newSeller(newSeller, password)
    let products = await productRepository.products() 
    
     res.redirect("/seller")
    }
    catch(err){
      res.status(500).json({
        error:err,
        status:"false",
      });
    }
}

//login seller
exports.loginMiddleware = passport.authenticate("local",{
  successRedirect:"/seller",
  faliureRedirect:"/login"
})

exports.login = (req,res)=>{
  try{
    let user = req.body.username;
    res.render('seller/login')
  } catch(err){
    res.status(500).json({
      status:false,
      error:err
    })
  }
}

// seller profile
exports.findById = async (req, res)=>{
  try{
    let uid = req.params.uid;
    let founduser = await sellerRepository.sellerById(uid);
    res.render("seller/profile")
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}

// edit form
exports.editSellerForm = async (req,res)=>{
  try{
    let uid = req.params.uid;
    let foundSeller = await sellerRepository.sellerById(uid);
    res.render("seller/edit",{seller:foundSeller});
  }
  catch(err){
    res.status(500).json({
      error:err,
      status:false,
    });
  }
}

//editing a Seller
exports.findByIdAndUpdate = async (req, res)=>{
  try{
    let uid = req.params.uid;
    let newData = req.body.details
    let editedSeller = await sellerRepository.editSeller(uid, newData);
    
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