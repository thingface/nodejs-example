var thingface = require("thingface");

var sensorInterval;

function commandHandler(senderType, senderId, commandName, commandArgs){
    if (commandName === "say") {
        console.log(commandArgs[0]);
    }
    // ..handle other commands
}

thingface.onConnectionState(function(newState){
    // 1 - connected
    // 0 - disconnected

    if (newState === 1) { // connected
        console.log("your device is now connected");
        sensorInterval = setInterval(sendRandomValueForSensor, 5000);
        // subscribe commands
        thingface.onCommand(commandHandler);
    }
    if (newState === 0) { // disconnected
        clearInterval(sensorInterval);
    }
});

thingface.connect("your-device-id", "device-secret-key");

function sendRandomValueForSensor(){
    var value = Math.random() * 100;
    thingface.sendSensorValue("s1", value);
}
