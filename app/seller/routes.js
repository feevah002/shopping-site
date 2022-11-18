const router = require("express").Router({mergeParams: true});
const sellerController = require("./controller");


// seller/customer seller roytes
router.get("/seller", sellerController.getSellersIndex)


// register new seller 
router.get("/seller/register", sellerController.newSellerForm)
router.post("/auth/register/seller", sellerController.create)

//seller login
router.get("/seller/login", sellerController.login)
router.post("/seller/auth/login", sellerController.loginMiddleware)


router.get("/seller/:uid", sellerController.findById)
// router.get("/meatro/:uid", sellerController.findByuid)

//editing user details
router.get("/seller/:uid/edit", sellerController.editSellerForm)
router.put("/seller/:uid", sellerController.findByIdAndUpdate)



router.delete("/seller/:uid", sellerController.findByIdAndRemove)


module.exports= router