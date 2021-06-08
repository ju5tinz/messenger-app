const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const onlineUsers = require("../onlineUsers");

module.exports = (server) => {
  const io = new Server(server);

  // socket.io middleware to check if user is authenticated
  io.use((socket, next) => { 
    const token = cookie.parse(socket.handshake.headers.cookie)["messenger-token"];
    
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if(err) {
        return next(new Error("Invalid token"));
      } else {
        next();
      }
    });
  });

  io.on("connection", (socket) => {
    socket.on("go-online", (id) => {
      if (!onlineUsers.hasOwnProperty(id)) {
        onlineUsers[id] = socket.id;
      }
      // send the user who just went online to everyone else who is already online
      socket.broadcast.emit("add-online-user", id);
    });

    socket.on("new-message", (data) => {
      socket.broadcast.emit("new-message", {
        message: data.message,
        sender: data.sender,
      });
    });

    socket.on("logout", (id) => {
      if (onlineUsers.hasOwnProperty(id)) {
        delete onlineUsers[id];
        socket.broadcast.emit("remove-offline-user", id);
      }
    });
  });
}