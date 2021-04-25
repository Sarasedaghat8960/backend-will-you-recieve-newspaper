var express = require('express');
var router = express.Router();
var cryptoJs=require("crypto-js");
const cors=require("cors");
var CryptoJS=require("Crypto-js")
/* GET users listing. */
router.use(cors());
router.get('/', function(req, res, next) {
 // let ourUsers=req.body

  req.app.locals.db.collection("users").find().toArray()
  .then(results=>{
    res.send(results);
  })
});

//CHECK LOGIN
router.post("/login", function(req, res){
  let   checkUser=req.body;
  console.log(checkUser);

  req.app.locals.db.collection("users").find( {"userName":checkUser.userName}).toArray()
.then(result => {
   console.log("users",result);
    if(result == ""){
      console.log("user does not found");
      res.json({"code":"Error"})

    }
    else{
      let decryptPassword= CryptoJS.AES.decrypt(result[0].password,"saltKey");
      let password=decryptPassword.toString(CryptoJS.enc.Utf8);
      result[0].password=password;
      if(result[0].password==checkUser.password){
        console.log("user is defined");
        res.json({"code":"ok","id":result[0]._id})
        console.log("Id",result[0]._id);
        

      }
    }

    res.redirect("/");
});
});



//CHANGE SUBSCRIPTION 
router.post("/change", function(req, res){
  let findUser=req.body;
  console.log("find user ",findUser);
  req.app.locals.db.collection("users").find( {"userName":findUser.userName} ).toArray()
.then(result => {
    console.log("username",result);
    let saveString;
    //console.log("result[0]",result[0]);
    if(result[0].newsLetter==true){
      saveString=false;
    }
    else{
      saveString=true;
    }
    req.app.locals.db.collection("users").updateOne( {"_id" : result[0]._id}, {$set: {"newsLetter": saveString} } )
    .then(result=>{
//console.log("after changing ",result);
 res.redirect("/");

  })  
   
  })
  
});

//REGISTER NEW USER
router.post("/new", function(req, res){
  newUser=req.body
  console.log(newUser);
  if(newUser==={}){
    res.status(400).send({message:"Please fill all the blankets!"})
    return
  }
  //newUser.id = rand.generate(); 
  //console.log(newUser.id);
  let cryptPassword=CryptoJS.AES.encrypt(newUser.password,"saltKey").toString();
  newUser.password=cryptPassword;
  console.log(cryptPassword);
  req.app.locals.db.collection("users").insertOne(req.body)
    .then(result=>{
  // console.log(result);
   res.redirect("/");
 })
 
  });
module.exports = router;