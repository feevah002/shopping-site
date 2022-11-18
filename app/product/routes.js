const router = require("express").Router();
const productController = require("./controller");

// user/customer product roytes
// router.get("/admin", productController.getProducts)
// router.get("/admin/meatro", productController.getProducts)

router.get("/", productController.getProducts)
router.get("/meatro", productController.getProducts)

router.post("/admin/meatro", productController.create)
// router.get("/admin/meatro/new", productController.newProdForm)


router.get("/meatro/:id", productController.findById)
// router.get("/admin/meatro/:id", productController.findById)

// router.put("/admin/meatro/:id", productController.findByIdAndUpdate)
// router.get("/admin/meatro/:id/edit", productController.editProdForm)


// router.delete("/admin/meatro/:id", productController.findByIdAndRemove)

module.exports= router