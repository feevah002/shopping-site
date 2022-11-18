const router = require("express").Router({mergeParams: true});
const userController = require("./controller");


router.get("/user", userController.getusers)

// create and register new user 
router.get("/register", userController.newUserForm)
router.post("/auth/register", userController.create)

//show page
router.get("/user/:uid", userController.findById)

//login user
router.get("/login", userController.login)
router.post("/auth/login", userController.loginMiddleware)


//finding a user
router.get("/user/:uid", userController.findById)


// edit user details 
router.get("/user/:uid/edit", userController.editUserForm)
router.put("/user/:uid", userController.findByIdAndUpdate)



router.delete("/user/:uid", userController.findByIdAndRemove)

module.exports= router