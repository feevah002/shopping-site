const router = require("express").Router();
const cartController = require("./controller");

// // user/customer cart roytes


router.get("/meatro/:uid/cart", cartController.getCart)

router.post("/meatro/:uid/cart", cartController.addItemToCart)

// router.get("/meatro/:uid/cart/:pid", cartController.findById)

// router.delete("/meatro/:uid/cart/:pid", cartController.findByIdAndRemove)

module.exports = router