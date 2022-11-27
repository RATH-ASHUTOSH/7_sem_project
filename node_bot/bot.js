var readline = require("readline"),
    fs = require("fs")
let RiveScript= require('rivescript')
var bot = new RiveScript();

// Load a directory full of RiveScript documents (.rive files). This is for
// Node.JS only: it doesn't work on the web!
loadBot();
function loadBot(){
    bot.loadDirectory("brain").then(loading_done).catch(loading_error);
}

/*// Load an individual file.
    bot.loadFile("brain/testsuite.rive").then(loading_done).catch(loading_error);
    
    // Load a list of files all at once (the best alternative to loadDirectory
    // for the web!)
    bot.loadFile([
    "brain/begin.rive",
    "brain/admin.rive",
    "brain/clients.rive"
    ]).then(loading_done).catch(loading_error);
*/

//auto reload when brain change
fs.watch("./brain", {recursive: true}, function() {
    console.log("");
    console.log('Brain changed, reloading bot.');
    rl.prompt();
    loadBot();
});

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multiple file names), the success function is called only when ALL
// the files have finished loading.
function loading_done() {
    console.log("Bot has finished loading!");
    
    // Now the replies must be sorted!
    bot.sortReplies();
    
    // And now we're free to get a reply from the brain!
    
    // RiveScript remembers user data by their username and can tell
    // multiple users apart.
    let username = "local-user";
    rl.setPrompt("You> ");
    rl.prompt();
    rl.on('line', async function(cmd) {
        // Handle commands.
        if (cmd === "/quit") {
            
            process.exit(0);
            } else {
            // Get a reply from the bot.
            var reply = await bot.reply(username, cmd);
            console.log("Bot>", reply);
            rl.prompt();
        }
        
        rl.prompt();
        }).on('close', function() {
        console.log("");
        process.exit(0);
    });
    
    /*// NOTE: the API has changed in v2.0.0 and returns a Promise now.
        bot.reply(username, "Hello, bot!").then(function(reply) {
        console.log("The bot says: " + reply);
    });*/
}

// It's good to catch errors too!
function loading_error(error, filename, lineno) {
    console.log("Error when loading files: " + error);
}    