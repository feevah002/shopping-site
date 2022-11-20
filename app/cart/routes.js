const router = require("express").Router();
const middlwareobj = require("../middleware/index")
const cartController = require("./controller");


router.get("/meatro/:uid/cart", middlewareObj.isUserLoggedIn, cartController.getCart)

router.post("/cart/:pid/add-to-cart", cartController.addItemToCart)

router.post("/cart/:pid/", cartController.emptyCart)

module.exports = router