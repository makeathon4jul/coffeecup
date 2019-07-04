
         function WebSocketTest() {
            
            if ("WebSocket" in window) {
               
               // Let us open a web socket
               var ws = new WebSocket("ws://localhost:8082");
				
               ws.onopen = function() {
                  
                  // Web Socket is connected, send data using send()
                 
               };
				
               ws.onmessage = function (evt) { 
                  var received_msg = evt.data;
				  
				  $("#boardList").append("<li>" + received_msg + "</li>");
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
		