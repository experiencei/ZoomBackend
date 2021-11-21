const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = 3001

app.get("/"  , (req , res) => {
    res.send("Hello Worlda")
})

io.on("connection" , socket => {
    console.log("someone connected");
    socket.on("join-room" , ({ roomId , userId}) => {
        console.log("joine");
        console.log(roomId);
        console.log(userId);
    })
})

server.listen(port , ()=> {
    console.log("Zoom Clone");
})