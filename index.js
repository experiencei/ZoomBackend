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
const getRoomUsers = (roomId) => {
   return users.filter(user => user.roomId == roomId)
}

const userLeave = (userId) => {
  users = users.filter(user => user.userName != userId)
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

        io.to(roomId).emit("all-users" , getRoomUsers(roomId))
        
        socket.on("disconnect" , ()=>{
            console.log("disconnect");
            socket.leave(roomId);
            userLeave(userName);
        io.to(roomId).emit("all-users" , getRoomUsers(roomId))
        })
    })
})

server.listen(port , ()=> {
    console.log("Zoom Clone");
})