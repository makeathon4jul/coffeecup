var SerialPort = require('serialport').SerialPort;
if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort('/dev/ttyUSB0', { baudrate: 57600 }); // still works if NODE_ENV is set to development!
 
sp.on('open', function (err) {
 
  sp.on("data", function(data) {
    console.log("From Arduino: " + data);
  });
 
  if (process.env.NODE_ENV == 'development') {
    sp.on("dataToDevice", function(data) {
      sp.writeToComputer(data + " " + data + "!");
    });
	sp.write("BLOOP"); // "From Arduino: BLOOP BLOOP!"
  }
});
