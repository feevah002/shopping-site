const router = require("express").Router();
const productController = require("./controller");

// user/customer product roytes
router.get("/", productController.getProducts)
router.get("/meatro", productController.getProducts)
router.get("/meatro/:id", productController.findById)

//admin products routes
router.get("admin/", productController.getProducts)
router.get("admin/meatro/:id", productController.findById)
router.get("/admin/meatro/new", productController.newProdForm)
router.post("/admin/meatro", productController.addNewProduct)
router.get("/admin/meatro/:id/edit", productController.editProdForm)
router.get("/admim/meatro/:id", productController.findByIdAndUpdate)

module.exports= router