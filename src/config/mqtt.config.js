require("dotenv").config();

const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MQTT_BROKER_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  port: Number.parseInt(process.env.MQTT_PORT, 10) || 1883,
  reconnectPeriod: 1000,
});
client.on("connect", () => {
  console.log(`Connected to MQTT broker: ${process.env.MQTT_BROKER_URL}`);
});

client.on("reconnect", () => {
  console.log("Reconnecting to MQTT broker...");
});

client.on("error", (err) => {
  console.error("MQTT error:", err?.message || err);
});

client.on("close", () => {
  console.log("MQTT connection closed");
});

module.exports = client;
