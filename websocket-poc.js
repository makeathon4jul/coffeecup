const WebSocket = require('ws')
var path = require('path');

const wss = new WebSocket.Server({ port: 8082 })

// const ourQueue = new Queue();

const coffeeLookup = { "0xf6" : {"name":"Heckley", "coffee":"Latte"}, "0xf5": { "name":"Clive", "coffee":"Espresso" }, "0x4c": { "name":"Brindha", "coffee":"Frappacino" }  }; 
const wsList = {};
var wsCount = 0;

wss.on('connection', ws => {
  wsList[wsCount++] = ws;
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  //ws.send('ho!')
})

const express = require('express');  
const bodyParser = require('body-parser');  
const url = require('url');  
const querystring = require('querystring');

let app = express();  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());
app.use(express.static('client'))

app.get("/", function(req,res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
})


// Function to handle the root path
app.get('/send', function(req, res) {

    // Access the provided 'page' and 'limt' query parameters
    let rfid = req.query.rfid;
	//console.log('wsList length...' + wsList.length);
	
	var coffee = coffeeLookup[rfid];
	
	for (w in wsList)  {
		wsList[w].send(JSON.stringify(coffee));
	}
	console.log('Done');
    res.sendStatus(200);
});

let server = app.listen(8080, function() {  
    console.log('Server is listening on port 8080')
});