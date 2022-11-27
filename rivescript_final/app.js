let express=require('express');
let app=express();
app.set('view engine','ejs');
//var router=express.Router();
//var public=require('./public');
//var modules=require('./modules');

app.get('/',(req,res)=>{
	res.render('views/chatbot');
});

app.listen(2222,(req,res)=>{
console.log("Listening to port 2222")});