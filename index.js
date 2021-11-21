const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const users = []
const port = 3001

app.get("/"  , (req , res) => {
    res.send("Hello Worlda")
})

const addUser = (userName , roomId) => {
    users.push({
        userName : userName,
        roomId : roomId
    })
}
const getAllUsers = (roomId) => {
   return users.filter(user => user.roomId === roomId)
}

io.on("connection" , socket => {
    console.log("someone connected");
    socket.on("join-room" , ({ roomId , userName}) => {
        console.log("joine");
        console.log(roomId);
        console.log(userName);
        socket.join(roomId);
        addUser(userName , roomId);  
        socket.to(roomId).emit("user-connected" , userName)

        io.emit
        
    })
})

server.listen(port , ()=> {
    console.log("Zoom Clone");
})