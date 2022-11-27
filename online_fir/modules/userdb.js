var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/online_fir',{useNewUrlParser:true});
var conn=mongoose.connection;
var userSchema=new mongoose.Schema({
    adharno:Number,
    name:String,
    mobileno:Number
});
var userModel=mongoose.model('user',userSchema);

conn.on('connected',()=>{
    console.log("database connected");
})

conn.on('disconnected',()=>{
    console.log("database disconnected");
})

conn.on('error',console.error.bind(console,'connection error'));

module.exports=userModel;