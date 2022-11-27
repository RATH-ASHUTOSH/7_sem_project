var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/logout', (req, res) => {
  console.log(req.cookies);
  //   for( let prop in req.cookies ){
  //     console.log( req.cookies[prop] );
  // }
  //   res.clearCookie('user');
  //   res.clearCookie('police');
  //   res.redirect('/');
  cookie = req.cookies;
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    res.cookie(prop, '', { expires: new Date(0) });
  }
  res.redirect('/');
});


module.exports = router;
