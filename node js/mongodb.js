var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Ashutosh:ashu08piku@cluster0.yt8na.mongodb.net/demodb?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});