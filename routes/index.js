var express = require('express');
var router = express.Router();
//const fs=require("fs");

let adminInfo={
  "name": "Sara",
  "adminName": "sara@mail.com",
  "adminPassword": "s1234"
}
/* GET home page. */
router.get('/', function(req, res, next) {
 let login=`<h1>Hello to server </h1>
 <h2>Enter admin username and password to log in as ADMIN</h2>
 ` 
 login+=`<form action="/admin" method="post">
 <div><input type="text" name="adminName">Enter Admin Name</div>
 <div><input type="password" name="adminPassword">Enter Admin Password</div>
 <div><button type="submit" name="adminLogin">log in </button></div>
</form>
<div id="hiUser"></div>`
res.send(login)
  
 
});


router.get("/admin" ,(req,res)=>{
  req.app.locals.db.collection("users").find().toArray()
  .then(results=>{
    let adminPage=`<h1>Here is the list of users </h1> `;
      //console.log("All users",results);
      adminPage+=`<ul><li><h1>These are persons which registered in the website </h1><ol><h3>`;
      for(user in results){
        adminPage+=`</h3></li></ol>`
        adminPage+=`<li>Name of User:`+results[user].name+`<br>users email:`+results[user].userName 
      }
       adminPage+=`<li><h2>List of emails of users that want to recieve newsletter:</h2><ol>`
      adminPage+=`</h3></li></ol>`
      for(user in results){
        if(results[user].newsLetter==true){ 
         
       adminPage += `<li>`+results[user].userName+`</li>`;
      }
    }
         adminPage+=`</li>`
   
       adminPage+=`</ol></li</ul>`;
    res.send(adminPage );

     return;
 
 
  });//then

});//router



router.post("/admin",function(req,res){
  //console.log(req.body.adminName);
  //console.log(adminInfo.adminName);

  if(req.body.adminName==adminInfo.adminName && req.body.adminPassword==adminInfo.adminPassword){
    res.redirect("/admin")
   // console.log("Admin name",req.body);
  }else {
      res.send("Incorrect username or password");
  }
  
  
});

module.exports = router;
