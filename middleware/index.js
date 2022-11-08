middlewareObj={};
middlewareObj.isLoggedIn = function (req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
  }
middlewareObj.adminIsLoggedIn = function (req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/admin/meatro/login")
  }

module.exports = middlewareObj;