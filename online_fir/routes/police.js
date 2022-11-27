var express = require('express');
var router = express.Router();
var policeModel = require('../modules/policedb');
var cookieParser=require('cookie-parser');
router.use(cookieParser());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('police/policelogin',{message:''});
});

router.post('/policevalidate', (req, res) => {
  var stid = req.body.id;
  var pass = req.body.password;
  console.log("stid=", stid);
  console.log("pass=", pass);
  var police = policeModel.findOne({ 'stid': stid });
  police.exec((err, data) => {
    if (err)
      throw err;
    else {
      console.log(data);
      if (data != null) {
        if (data.password == pass) {
          res.cookie('police',data);
          res.redirect('/police/dashboard');
        }
        else {
          res.render('police/policelogin',{message:"Wrong User Id or Password entered!"});
        }
      }
      else {
        res.render('police/policelogin',{message:"Wrong User Id or Password entered!"});
      }
    }
  })
});
router.get('/dashboard',(req,res)=>{
  if(req.cookies.police!=null)
  {
    res.render('police/policedash',{police:req.cookies.police});
  }
  else
  {
    res.redirect('/police',{message:'Sign In First!!'});
  }
});

module.exports = router;
