var thingface = require("thingface");

var sensorInterval;

thingface.onConnectionState(function(newState){
    // 1 - connected
    // 0 - disconnected

    if (newState === 1) { // connected
        console.log("your device is now connected");
        sensorInterval = setInterval(sendRandomValueForSensor, 6000);
    }
    if (newState === 0) { // disconnected
        clearInterval(sensorInterval);
    }
});

thingface.connect("deviceid", "devicesecretkey");

function sendRandomValueForSensor(){
    var value = Math.random() * 100;

    thingface.sendSensorValue("temp", value);
}
