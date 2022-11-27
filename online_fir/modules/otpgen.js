const axios = require("axios");

// const tlClient = axios.create({
//   baseURL: "https://api.textlocal.in/",
//   params: {
//     "apiKey": "pKQ3IZn8v2Y-U72Gv8paVntoUKFNVrRa4uWqrN1Llf", //Text local api key
//     "sender": "TXTLCL",
//     "test":'true'
//   }
// });

// const smsClient = {
//     sendOTPMessage(){
//       const params = new URLSearchParams();
//       params.append("numbers", [parseInt("9348209242")]);
//       params.append(
//         "message",
//         `Your OTP for verification is 1234`
//       );
//     tlClient.post("/send", params).then(res=>{
//         console.log(res.data);
//     })
//     //   sendmsg.then(res=>{
//     //       console.log(res.data);
//     //   })
//     }
// };
// smsClient.sendOTPMessage();
// module.exports = smsClient;

// // Now import the client in any other file or wherever required and run these functions
// // const smsClient = require("./smsClient");
// cosmsClient.sendOTPMessage();

const msg=axios.post('https://api.textlocal.in/send',{
    params:{
    // Account details
    "username" : encodeURIComponent('sunny.trilochan@gmail.com'),
    "hash" : encodeURIComponent('5f812d1efa26fe356cf6bd375aecb18fd2678bcd8f3746c0d9e4211cb5c547db'),
    "apiKey": encodeURIComponent('pKQ3IZn8v2Y-U72Gv8paVntoUKFNVrRa4uWqrN1Llf'),

    // Message details
    "numbers" : "9348209242",
    "sender" : encodeURIComponent('TXTLCL'),
    "message": encodeURIComponent("Your otp is 1234"),
    "test":true
    }
});
msg.then(res =>{
    console.log(res.data)
});