// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const cors = require ("cors") 
//things to add in the server. 
const http = require("http") 
//create a server out of http
const server = http.createServer(app); 
const { Server } = require("socket.io"); 

let users = [];
console.log(users)

//config of socket.io
const io = new Server(server , {  
  cors: {
    origin: "*"
  }
}); 


const addUser = (userId, socketId) => {
console.log("theses are, ", userId, socketId)
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);

const auth = require("./routes/auth");
app.use("/auth", auth);

// const path = require('path');
// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.use((req, res) => {
//   // If no routes match, send them the React HTML.
//   res.sendFile(__dirname + "/client/dist/index.html");
// });

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


server.listen(5005, () => {    
  console.log(`Server listening on http://localhost:${5005}`);
});