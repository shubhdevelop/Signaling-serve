import express from 'express'
import { Server }  from 'socket.io'
import { createServer } from 'http'
const PORT = 3000

const app = express()

const server = createServer(app)
const io = new Server(server);

app.get("/", (req, res)=>{
    res.send("<h1>hello there</h1>")
})

io.on('connection',(socket)=>{
    console.log("new User connected")
    socket.on("offer-forward", (offer)=>{
        console.log(offer)
        
        io.emit('recieve-offer', offer)
    })

    socket.on('forward-answer', (answer)=>{
        console.log(answer);
        io.emit('recieve-answer', answer)
    })
})

server.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`)
})
