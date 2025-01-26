const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const net = require("net");
const WebSocket = require("ws");

const app = express();
app.use(cors());

// Server port
const HTTP_PORT = 3333;
const TCP_PORT = 8080;

// Logging
app.use(morgan("tiny"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ status: "Alive" });
});

// Other API endpoints: Links go here...
require("./app/routes/user.server.routes.js")(app);
require("./app/routes/food.server.routes.js")(app);
require("./app/routes/bmi.server.routes")(app);

// Create HTTP server
const server = app.listen(HTTP_PORT, () => {
  console.log("HTTP server running on port: " + HTTP_PORT);
});

// Create WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("A new WebSocket client connected");

  // Send a welcome message to the newly connected WebSocket client
  ws.send(
    JSON.stringify({ sender: "Server", text: "Welcome to the WebSocket chat!" })
  );

  // Broadcast messages to all WebSocket clients
  ws.on("message", (message) => {
    console.log(`Received from WebSocket client: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ sender: "Client", text: message.toString() })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("A WebSocket client disconnected");
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

// Send periodic messages to all WebSocket clients
setInterval(() => {
  const message = JSON.stringify({
    sender: "Server",
    text: "Periodic message from the server",
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}, 5000);

// REST API endpoint to send messages from backend to WebSocket clients
app.post("/sendMessage", (req, res) => {
  const { text } = req.body;
  const message = JSON.stringify({ sender: "Server", text });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
  res.status(200).json({ message: "Message sent to all WebSocket clients" });
});

// TCP Server for client connections
const tcpServer = net.createServer((socket) => {
  console.log("TCP client connected:", socket.remoteAddress);

  // Handle data from TCP client
  socket.on("data", (data) => {
    console.log("TCP client says:", data.toString());

    // Broadcast the received message to all WebSocket clients
    const tcpMessage = JSON.stringify({
      sender: "TCP Client",
      text: data.toString(),
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(tcpMessage);
      }
    });

    // Prompt for server response in the console
    process.stdin.once("data", (input) => {
      socket.write(input.toString().trim());
    });
  });

  // Handle TCP client disconnection
  socket.on("close", () => {
    console.log("TCP client disconnected:", socket.remoteAddress);
  });

  // Handle TCP errors
  socket.on("error", (err) => {
    console.error("TCP socket error:", err);
  });
});

// Start the TCP server
tcpServer.listen(TCP_PORT, "0.0.0.0", () => {
  console.log(`TCP server started on port ${TCP_PORT}`);
});

// Default response for any other request
app.use((req, res) => {
  res.sendStatus(404);
});

console.log("WebSocket server is running on ws://localhost:" + HTTP_PORT);
