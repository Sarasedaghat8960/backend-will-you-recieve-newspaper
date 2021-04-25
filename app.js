var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const MongoClient=require("mongodb").MongoClient;
MongoClient.connect("mongodb+srv://Another-database:Nikan1392@cluster0.dpcjn.mongodb.net/db1?retryWrites=true&w=majority",{
    useUnifiedTopology:true 
})
.then(client=>{
    console.log("Database  is conected");
    const db =client.db("db1");
    app.locals.db=db ;
});
// const MongoClient=require("mongodb").MongoClient;
// const client = new MongoClient("mongodb+srv://Another-database:Nikan1392@cluster0.dpcjn.mongodb.net/db1?retryWrites=true&w=majority");

// MongoClient.connect("mongodb+srv://Another-database:Nikan1392@cluster0.dpcjn.mongodb.net/db1?retryWrites=true&w=majority",{ useUnifiedTopology: true }
// ,(err, client)=>{

//     console.log("Database  is conected");
//     const db =client.db("db1");
//     app.locals.db=db ;

// });
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Another-database:NIkan1392@cluster0.dpcjn.mongodb.net/db1?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("db1").collection("devices");
//   console.log("Database  is conected");
//   // perform actions on the collection object
//   client.close();
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
