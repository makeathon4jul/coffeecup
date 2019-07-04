
         function WebSocketTest(withPhoto) {
            
            if ("WebSocket" in window) {
               
               // Let us open a web socket
               var ws = new WebSocket("ws://localhost:8082");
				
               ws.onopen = function() {
                  
                  // Web Socket is connected, send data using send()
                 
               };
				
               ws.onmessage = function (evt) { 
                  var received_msg = JSON.parse(evt.data);
				  
/* 				  var row = findRow(received_msg.name);
				  if (row.length == 0) {
					  $("#boardList").append("<tr id='" + received_msg.name + "'><td>" + received_msg.name + "</td><td>" + received_msg.coffee 
					  + "</td><td><input type='button' value='Served' onclick='removeRow(\""+received_msg.name+"\")'\"></input></td></tr>");
				  } else {
					highLightRow(row, true, "red");
				  }
				  
					
 */               
					if (withPhoto) {
						$('#photo').attr('src', "images/" + received_msg.photo);
					}
					$("#name").html(received_msg.name);
					$("#drink").html(received_msg.drink);

				};
				
               ws.onclose = function() { 
                  
                  // websocket is closed.
                  alert("Connection is closed..."); 
               };
            } else {
              
               // The browser doesn't support WebSocket
               alert("WebSocket NOT supported by your Browser!");
            }
         }
		 
		 function findRow(name) {
			return $('*[id=' + name + ']').first();
		 }
		 
		 function highLightRow(row, active, colour) {
			row.css( "background-color", colour );
			if (active) {
				setTimeout(function(){ highLightRow(row, false, "white"); }, 500);
			}
		 }
		 
		 function removeRow(name) {
			 $('*[id=' + name + ']').first().remove();
		 }
		