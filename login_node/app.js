let express=require('express');
let app=express();
let path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',function (req, res) {
res.render('index')
});

app.listen(2222,(req,res)=>{
console.log("Listening to port 2222")});