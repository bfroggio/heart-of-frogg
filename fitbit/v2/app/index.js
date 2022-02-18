/*
 * Entry point for the watch app
 */
import document from "document";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";
import { me } from "appbit";

// Disable timeout, so app stays open when screen turns off
me.appTimeoutEnabled = false;

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("heartRate");

// Initialize the UI with some values
hrLabel.text = "--";

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received
hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
  sendMessage(hrm.heartRate);
}

// Begin monitoring the sensor
hrm.start();

// Open a connection to the companion app
messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Connection to companion opened");
});

// Don't really need this but might be useful for debugging
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

function sendMessage(rate) {
  console.log("Sending message");
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(rate);
    console.log("Message sent");
  }
}