declare var require:any
const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app)
import { Server } from "socket.io";

const io = new Server(server,{ 
    cors:{
        //allowingf anyone on the server we created as io 
        origin:"*",
    }
});

type Point={
    x:number,
    y:number;
}

type Drawline={
    prevPoint:null | Point,
    currentPoint: Point,
    color:string,
}

io.on("connection", (socket) => {
    socket.on('client-ready',()=>{
        socket.broadcast.emit('get-canvas-state')
      })
  
      socket.on('this-is-canvas-state',(state)=>{
        socket.broadcast.emit('canvas-state-from-server',state) 
      })


    console.log('connected')
    socket.on('draw-line',({prevPoint,currentPoint,color}:Drawline)=>{
        socket.broadcast.emit('draw-line',{prevPoint,currentPoint,color})
    })

    socket.on('clear',()=>io.emit('clear'))
  });
  app.get('/',async(req,res)=>{
    res.send('jai shree ram')
  })
server.listen(3001,()=>{
    console.log('listening on 3001')
})