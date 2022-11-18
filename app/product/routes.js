const router = require("express").Router({mergeParams: true});
const productController = require("./controller");
const multerInstance = require("../../config/multer")

// user/customer product roytes
// router.get("/admin", productController.getProducts)
// router.get("/admin/meatro", productController.getProducts)

router.get("/", productController.getProducts)
router.get("/meatro", productController.getProducts)
router.get("/seller/meatro", productController.getProducts)
router.get("/admin", productController.getProducts)

// creating a new product - admin
router.get("/seller/meatro/new", productController.newProdForm)
router.post("/meatro", multerInstance.upload.single("prodImage"),  productController.create)


// show route -admin/user
// router.get("/seller/:pid", productController.findById)
router.get("/meatro/:pid", productController.findById)
router.get("/seller/meatro/:pid", productController.findById)


// update route -admin
router.get("/seller/meatro/:pid/edit", productController.editProdForm)
router.put("/meatro/:pid", productController.findByIdAndUpdate)


// delete route - admin
router.delete("/seller/meatro/:pid", productController.findByIdAndRemove)

module.exports= router