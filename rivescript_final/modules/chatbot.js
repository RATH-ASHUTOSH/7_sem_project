let bot = new RiveScript();

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

const brains = [
    //'https://gist.githubusercontent.com/awesammcoder/91e0f6c527bfdc03b8815289ca4af150/raw/6410ce00b7e1ea0dbd28be03b6eaab64252a841d/brain.rive'
    "./public/rivefiles/brain.rive",
    "./public/rivefiles/begin.rive"
    //'http://192.168.43.109:8000//bot.rive'
];

bot.loadFile(brains).then(botReady).catch(botNotReady);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    selfReply(input_box.value);
    input_box.value = '';
});

function botReply(message){
    message_container.innerHTML += `<div class="bot">${message}</div>`;
    location.href = '#edge';
}

function selfReply(message){
    message_container.innerHTML += `<div class="self">${message}</div>`;
    location.href = '#edge';
    
    bot.reply("local-user", message).then(function(reply) {
        botReply(reply);
    });
}

function botReady(){
    bot.sortReplies();
    botReply('Hello, im your virtual police.\n How can i help you ?');
}

function botNotReady(err){
    console.log("An error has occurred.", err);
}