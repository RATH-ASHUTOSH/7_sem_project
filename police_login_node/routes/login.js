var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ashutosh:ashu08piku@cluster0.ktche.mongodb.net/VPS_Project?retryWrites=true&w=majority";

router.post('/', function (request, response) {
    var uid = request.body.username;
    var psw = request.body.password;
    console.log(uid);
    console.log(psw);
    request.session.uid = uid;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("VPS_Project");
        var query = { uid: uid };
        var projection = {
            _id: 0,
            uid: 1,
            psw: 1,
            phone_number : 1
        };

        /*var result = dbo.collection("police_details").find(query).project(projection);
        console.log(result);*/
  
        dbo.collection("police_details").find(query).project(projection).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            if (uid == result[0].uid && psw == result[0].psw) {
                console.log("login successful");
                response.redirect('/home');
            }
            else {
                console.log("login unsuccessful");
                response.redirect('/');
            }
            /*console.log(result[0].uid);
            console.log(result[0].psw);*/
            db.close();
        });
    });
});

module.exports = router;