var express = require('express');
var router = express.Router();
//var userModel=require('../modules/user');
/* GET users listing. */
const pdfkit=require('pdfkit');
const fs=require('fs');
const pdfdoc=new pdfkit;
var cookieParser=require('cookie-parser');
router.use(cookieParser());
var userModel=require('../modules/userdb');

router.get('/', function(req, res, next) {
  res.render('users/userlogin',{message:''});
});
router.post('/',(req,res)=>{
  //console.log("inside post");
  var adharno=req.body.adharno;
  //console.log("adharno received",adharno);
  userQuery=userModel.findOne({'adharno':adharno});
  userQuery.exec((err,data)=>{
    if(err)
    {
      console.log("error",err);
      throw err;
    }
    else
    {
      console.log("data",data);
      if(data==null)
      {
        res.render('users/userlogin',{message:'Wrong Adhar Number Entered'});
      }
      else
      {
        res.cookie('adharno',adharno);
        res.render('users/otpinput',{message:''});
      }
      
    }
  });
})
router.post('/otpvalidate',(req,res)=>{
  if(req.body.otp==1234)
  {
    var adharno=req.cookies.adharno;
    console.log(adharno);
    var userQuery=userModel.findOne({'adharno':adharno});
    userQuery.exec((err,data)=>{
    if(err)
    {
      console.log("error",err);
      throw err;
    }
    else
    {
      res.cookie('user',data);
      res.redirect('/users/dashboard');
    }
    });
  }
  else
  {
    res.render('users/otpinput',{message:'Wrong OTP Entered'});
  }
});
router.get('/dashboard',(req,res)=>{
  if(req.cookies.user!=null)
  {
    res.render('users/userdash',{user:req.cookies.user});
  }
  else
  res.redirect('/users');
  
});


router.get('/userdetails',(req,res)=>{
  if(req.cookies.user!=null)
  {
    res.render('users/userdetails',{user:req.cookies.user});
  }
  else
  res.redirect('/users');
  
});

router.get('/inputfir',(req,res)=>{
  if(req.cookies.user==null)
  res.redirect('/users');
  else
  {
    res.render('users/inputfir',{user:req.cookies.user});  
  }
});

function generatepdf(details){
  console.log(details);
  pdfdoc.pipe(fs.createWriteStream("fir.pdf"));
  var firContent="To\n"+
  "The Police Officer in Charge\n"+
  details.psname+"\n\n"+
  "Sub: To file a FIR for "+details.crime+"\n\n"+
  "Respected Sir,\n"+
  "   I "+details.name+" S/O "+details.fname+" residing at "+details.address+" having contact no "+details.phone+",would like to report that on "+details.date+
  "at "+details.place+", I was a victim of "+details.crime+",the particular details are:"+details.cdetails+".and the suspect deatils are:"+details.sdetails+"\n\n"+
  "I seek your help and request to kindly register my FIR in the subject matter.\n";
  console.log(firContent);
  pdfdoc.text(firContent);
  pdfdoc.end();
}

router.post("/genfir",(req,res)=>{
  if(req.cookies.user!=null)
  {
    var details={
      name:req.body.name,
      address:req.body.paddress,
      fname:req.body.fname,
      phone:req.body.phoneno,
      date:req.body.date,
      crime:req.body.ctype,
      cdetails:req.body.cdetails,
      place:req.body.place,
      psname:req.body.psname,
      sdetails:req.body.sdetails
    };
    generatepdf(details);
    res.redirect('/users/dashboard');
  }
  else
  res.redirect('/users',{message:''});
  
})
module.exports = router;
