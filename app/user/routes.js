const router = require("express").Router();
const userController = require("./controller");


router.get("/user", userController.getusers)

// create and register new user 
router.get("/user/new", userController.newUserForm)
router.post("/register", userController.create)


//login user
router.post("/login", userController.loginMiddleware, userController.login)

//finding a user
router.get("/user/:id", userController.findById)


// edit user details 
router.get("/meatro/:id/edit", userController.editUserForm)
router.put("/user/:id", userController.findByIdAndUpdate)



router.delete("/user/:id", userController.findByIdAndRemove)

module.exports= router