// First, npm install eventsource
const EventSource = require('eventsource');

const eventSourceInit = { headers: {"Authorization": "Bearer 51e6da9e7fdfc4dabb3945d71588fedd", } }
const es = new EventSource("https://api.pipedream.com/sources/dc_4Ou4ykL/sse", eventSourceInit);

console.log("Listening to SSE stream at https://api.pipedream.com/sources/dc_4Ou4ykL/sse\n");

es.onmessage = event => {
	console.log(typeof(event.data));
	/*const fs = require('fs');

	fs.writeFile("Output.txt", event.data, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});*/
	var obj=JSON.parse(event.data);
	console.log(typeof(obj));
	var name=obj.event.body.queryResult.parameters;
	console.log(name);
	
	//console.log(event.data);
  }