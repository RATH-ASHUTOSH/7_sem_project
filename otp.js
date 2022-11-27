const Nexmo = require('nexmo');

function generateOTP() { 
	
	// Declare a digits variable  
	// which stores all digits 
	var digits = '0123456789'; 
	let OTP = ''; 
	for (let i = 0; i < 4; i++ ) { 
		OTP += digits[Math.floor(Math.random() * 10)]; 
	} 
	return OTP; 
} 

const nexmo = new Nexmo({
	apiKey: 'f5dc0604',
	apiSecret: 'ddFnh5HH6dePLtRo',
});

const from = 'Vonage APIs';
const to = '919090349202';
const otp=generateOTP();
const text = 'Your One Time Password is '+otp;

nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
		} else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
			} else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
		}
	}
})