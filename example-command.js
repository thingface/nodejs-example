var thingface = require("thingface");

function commandHandler(sender, commandName, commandArgs){
    if (commandName === "say") {
        console.log(commandArgs[0]);
    }
    // ..handle other commands
}

thingface.onConnectionState(function(newState){
    if (newState === 1) { // connected
        thingface.onCommand(commandHandler);
    }
});

thingface.connect("your-device-id", "device-secret-key", "thingface-server-host");
