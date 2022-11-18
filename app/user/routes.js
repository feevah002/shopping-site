const router = require("express").Router();
const userController = require("./controller");

// user/customer user roytes
router.get("/user", userController.getusers)


router.get("/user/new", userController.newUserForm)
router.post("/user", userController.create)



router.get("/user/:id", userController.findById)
// router.get("/meatro/:id", userController.findById)

router.put("/user/:id", userController.findByIdAndUpdate)
router.get("/meatro/:id/edit", userController.editUserForm)


router.delete("/user/:id", userController.findByIdAndRemove)

module.exports= router