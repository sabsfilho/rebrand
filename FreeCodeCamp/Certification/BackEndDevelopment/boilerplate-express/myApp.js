let bodyParser = require("body-parser");
let express = require("express");
let app = express();
module.exports = app;

bodyParser = require("body-parser");
//console.log("Hello World");
//app.get('/',(req, res)=>res.send('Hello Express'));
/*
app.use('/json', (req, res, next) =>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);  
  next();  
});
*/
/*
app.get('/now',(req, res, next) =>{
  req.time = new Date().toString();  
  next();
}, (req, res) => res.json({time: req.time}));
*/
/*
app.get('/:word/echo', (req, res, next) => res.json({echo: req.params.word}));
*/
/*
app.get('/name', (req, res, next) => res.json({name: `${req.query.first} ${req.query.last}`}));
*/
/*
app.use('/', bodyParser.urlencoded({extended: false}));
*/

app.post(
  "/name",  
  bodyParser.urlencoded({extended: false}),
  (req, res, next) => res.json({name: `${req.body.first} ${req.body.last}`})
);

app.use('/public', express.static(__dirname + "/public"));
app.get('/',(req, res)=>res.sendFile(__dirname + "/views/index.html"));

//app.get('/json',(req, res)=>res.json({"message": process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json"}));

