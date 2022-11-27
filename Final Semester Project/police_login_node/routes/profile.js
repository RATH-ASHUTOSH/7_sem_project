var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ashutosh:ashu08piku@cluster0.ktche.mongodb.net/VPS_Project?retryWrites=true&w=majority";

router.get('/', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err)
        {
            throw err;
        }
        var dbo = db.db("VPS_Project");
        var uid = req.session.uid;
        var query = { uid: uid };
        var projection = {
            _id: 0,
            uid: 1,
            phone_number: 1,
            station: 1
        };
        var projection2={
            _id : 0,
            status: 1
        };
        let length;
        let count=0;
        dbo.collection("fir_details").find({}).project(projection2).toArray(function(err,result){
            length=result.length;
            result.forEach(row => {
                if((row.status).toUpperCase()=="COMPLITED")
                    count++;  
            });
        });
        
        dbo.collection("police_details").find(query).project(projection).toArray(function (err, result) {
            if (err) 
                throw err;
            console.log(result);
            res.render('profile',{data: result,noc : length,noac : count});

        });

    });
});

module.exports = router;
