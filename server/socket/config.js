const { Server } = require("socket.io");
const onlineUsers = require("../onlineUsers");

module.exports = (server) => {
  const io = new Server(server);

  // socket.io middleware to check if user is authenticated
  io.use((socket, next) => { 
    console.log(socket.handshake.headers.cookie);
    next();
  })

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