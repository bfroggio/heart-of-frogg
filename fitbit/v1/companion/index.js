/*
 * Entry point for the companion app
 */

import * as messaging from "messaging";
import { settingsStorage } from "settings";

console.log("Companion code started");

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Ready to send or receive messages");
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

messaging.peerSocket.addEventListener("message", (evt) => {
  var ipAddress = settingsStorage.getItem("ipAddress");
  var port = settingsStorage.getItem("port");
  var url="http://"+JSON.parse(ipAddress).name+":"+JSON.parse(port).name+"/heart/"+evt.data;
  console.log(url);
  fetch(url, {method: 'POST'}).then(function(response) {
      return response.text();
    }).then(function(text) {
      console.log("Got JSON response from server: " + text); });
});

if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
  // Send a message
}
if (messaging.peerSocket.readyState === messaging.peerSocket.CLOSED) {
  // Display error message
}