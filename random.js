
//upload
// app.post("/upload", upload.single('image'), function(req,res, err){
//       console.log(req.body)
//       console.log(req.file);
//         res.end();
// });

//create- only for admin
// connecting to server

// adding data to the datase

// Product.create({
//   prodName : "XTRA LARGE",
//   prodDesc : "i dont wanna act likeeee",
//   prodImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUZU-KmW9AjtmpKh7m8nvw7QyDLwtrCYrt2-pkBGh&s",
//   prodPrice: 3500,
// }, function (err,  created) {
//   if(err){console.log(err)}
//   else{console.log(created)}
//   })  

// clearing the db 
// Product.deleteMany({}, (err) => {
//   if (err){console.log(err)}
//   else{console.log("all prod deleted")}
// });
//routes


// User.deleteMany({}, function(err, del){
//   if(err){console.log(err)}
//   else{console.log("deleted");}
// });