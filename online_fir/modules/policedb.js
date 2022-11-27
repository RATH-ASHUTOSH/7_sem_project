var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/online_fir',{useNewUrlParser:true});
var conn=mongoose.connection;
var policeSchema=new mongoose.Schema({
    stid:String,
    name:String,
    pin:Number,
    password:Number
});
var policeModel=mongoose.model('police',policeSchema);

conn.on('connected',()=>{
    console.log("police database connected");
})

conn.on('disconnected',()=>{
    console.log("police database disconnected");
})

conn.on('error',console.error.bind(console,'police db connection error'));

module.exports=policeModel;