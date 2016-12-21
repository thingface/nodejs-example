var mqtt = require('mqtt');
var Buffer = require('buffer').Buffer;
var _sendRandomSensorValueInterval;

// DEVICE and HOST SETUP
var THINGFACE_PORT = 8883;
var THINGFACE_HOST = "xyz-app.thingface.io";
var DEVICE_ID = "<enter_device_id>";
var DEVICE_SECRET = "<enter_device_secret>";

// Setup MQTT client and connect to broker
var options = {
    port: THINGFACE_PORT,
    username: DEVICE_ID,
    password: DEVICE_SECRET,
    clientId: DEVICE_ID,
    clean: true,
    rejectUnauthorized: false
};
var client  = mqtt.connect('mqtts://'+THINGFACE_HOST, options);

// Handle 'connect' event
client.on('connect', function () {
    console.log(DEVICE_ID+' is connected successfully');
    // subscribe commands for this device from all users
    client.subscribe('tf/c/+/' + DEVICE_ID);
    //client.subscribe('tf/c/user_name/' + DEVICE_ID);
    _sendRandomSensorValueInterval = setInterval(sendRandomSensorValue, 5000);
});

// Handle 'message' event
client.on('message', function (topic, message) {
    // message is Buffer
    var payload = bufferToJson(message);
    //console.log("received command", payload.c, "with args", payload.a);
    // handle incomming commands
    if(payload.c === "shutdown"){
        shutdown();
    }
    if(payload.c === "say"){
        say(payload.a[0]);
    }
});

// EXAMPLE sending random sensor value
function sendRandomSensorValue(){

    var value = Math.random() * 100;

    sendSensorValue("sensor1", value);
}

// Helper functions
function jsonToBuffer(obj){
    if(!obj) {
        return new Buffer();
    }
    var str = JSON.stringify(obj);
    return new Buffer(str, "utf8");
}

function bufferToJson(buffer){
    if (!buffer) {
        return null;
    }
    var str = buffer.toString();
    var json = JSON.parse(str);
    return json;
}

// use this function for sending sensor value
function sendSensorValue(sensorId, sensorValue){
	var message = jsonToBuffer({v:sensorValue});
    client.publish("tf/d/" + DEVICE_ID + "/" + sensorId, message);
}

function shutdown(){
    if(client.connected){
        console.log(DEVICE_ID+" is shutting down..");
        clearInterval(_sendRandomSensorValueInterval);
        client.end();
    }
}

function say(text){
    console.log(text);
}
