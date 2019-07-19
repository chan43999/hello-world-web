const express = require("express")

const server = express()

server.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
})
server.listen(3000, () =>{
    console.log("start express server")
})

