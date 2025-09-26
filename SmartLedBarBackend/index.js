const Serial = require("./serial");
const Api = require("./api");

const ConnectionSerial = new Serial({
    baudRate: 19200,
    autoOpen: false
});

new Api(ConnectionSerial);
