const express = require('express');
//Creating Express App
const app = express();
//MongoDB
const mongoose = require('mongoose');
//Mongo User Shcema
const Users_Details = require('./models/user_login');
//Register View Engine
app.set('view engine', 'ejs');
///Connection With MongoDB
mongoose.connect('mongodb://localhost:27017/VPS_Project', {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Connected To MongoDB'))
    .catch((err) => console.log(err));

//Twilio Connection
const accountSid = "ACbbc62cd556dd385c7f91872109e2e1ad";
const authToken = "9cd49ebc4f8016010eebf90d76e36886";
const client = require('twilio')(accountSid, authToken);
//Cookie Parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//Middleware And Static Files
app.use(express.static('./Public'));
app.use(express.urlencoded({extended: true}));

//Listen For Requests
app.listen(3000, ()=>{
    console.log("Server Listening At Port Number:3000");
});
app.get('/', (req, res)=>{
    res.render('index', {title: 'Home Page'});
});
app.get('/login', (req, res)=>{
    res.render('login', {title: 'Login', value:''});
});
app.post('/user_login', (req, res) =>{
    const no = req.body.user_aadharnumber;
    Users_Details.exists({"aadhar_number": no}, function(err, doc){
        if(err){
            console.log(err);
        }
        else{
            if(doc == false)
            {
                res.render('login', {title: 'Login', value: 'doc'});
            }
            else
            {
                var otp=Math.floor(Math.random() * 10000) + 1;
                console.log("OTP Created");
                client.messages
                .create({
                    body: 'OTP For Login Is: '+ otp,
                    from: '+18564756120',
                    to: '+919178672627'
                })
                .then(message => console.log(message));

                res.cookie('adharno', no);
                res.cookie('otp',otp);
                res.render('user_otp_enter', {value:''});
            }
        }
    });
});

app.post('/user_otp_verification', (req, res) => {
    if (req.body.user_otp == req.cookies.otp){
        res.send("Home Page")
    }
    else{
        res.render('user_otp_enter', {value:1});
    }
});