var thingface = require("thingface");

function commandHandler(senderType, senderId, commandName, commandArgs){
    if (commandName === "say") {
        console.log(commandArgs[0]);
    }
    // ..handle other commands
}

thingface.onConnectionState(function(newState){
    if (newState === 1) { // connected
        console.log("device is connected");
        thingface.onCommand(commandHandler);
    }
});

thingface.connect("deviceid", "devicesecretkey");
