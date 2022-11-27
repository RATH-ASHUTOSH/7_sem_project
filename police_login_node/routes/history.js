var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ashutosh:ashu08piku@cluster0.ktche.mongodb.net/VPS_Project?retryWrites=true&w=majority";

router.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("VPS_Project");
        var uid = req.session.uid;
        console.log(uid);
        var query = {};
        console.log(query);
        var projection = {
            _id: 0,
            aadhar_number: 1,
            launch_date: 1,
            compilation_date: 1,
            cid: 1,
            complaint_type: 1,
            priority: 1,
            status: 1,
            phone_number: 1

        };

        var sort = {
            compilation_date: -1
        }

        /*var result = dbo.collection("fir_details").find(query);
        console.log(result);*/
        /*var res = dbo.collection("fir_details").find({}).toArray();
        res.then((data) => console.log("hi"+data));
        console.log(res);*/
        /*console.log(result[0].uid);
        console.log(result[0].psw);*//*
        db.close();
    });*/
        dbo.collection("fir_details").find(query).project(projection).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('history', { data: result })
            db.close();
        });
    });

});
router.post('/status_onchange',function(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("VPS_Project");
        var status=req.body.status;
        console.log(status);
        var cid = req.body.cid;
        console.log(cid);
        var query = { cid: cid };
        console.log(query);
        var update = {$set: {status: status} }
        console.log(update);
        dbo.collection("fir_details").updateOne(query,update, function (err, result) {
            if (err) throw err;
            console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
            res.redirect('/history');
            db.close();
        });
    });
    
});
module.exports = router;