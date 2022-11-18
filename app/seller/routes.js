const router = require("express").Router();
const sellerController = require("./controller");


// seller/customer seller roytes
router.get("/seller", sellerController.getSellers)


// register new seller 
router.get("/seller/register", sellerController.newSellerForm)
router.post("/seller/register", sellerController.create)

//seller login
// router.get("/seller/login", function(res,res){
//   res.json({hi:"hi"})
// })
router.post("/seller/login", sellerController.loginMiddleware, sellerController.login)


router.get("/seller/:id", sellerController.findById)
// router.get("/meatro/:id", sellerController.findById)

router.put("/seller/:id", sellerController.findByIdAndUpdate)
router.get("/meatro/:id/edit", sellerController.editSellerForm)


router.delete("/seller/:id", sellerController.findByIdAndRemove)


module.exports= router