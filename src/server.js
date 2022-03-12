import express, { json } from "express";
import http from "http"
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000, ws://localhost:3000`);

const httpServer = http.createServer(app); // server for http
const ioServer = SocketIO(httpServer);

ioServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket event: ${event}`);
    });

    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("wtffffff"); // 자기 자신은 제외
    });
});

// const wss = new WebSocket.Server({ server }) // http, web server를 동시에 돌리기 위함

// const sockets = [];

// wss.on('connection', (socket) => {
//     sockets.push(socket); // add socket to queue
//     socket["nickname"] = "Ananymous";

//     socket.on("message", (message) => {
//         const jsonMessage = JSON.parse(message);
        
//         switch(jsonMessage.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) => { 
//                     if(aSocket != socket) {
//                         aSocket.send(`${socket.nickname}: ${jsonMessage.payload}`);
//                     }
                    
//                 });
//                 break;
//             case "nickname":
//                 socket["nickname"] = jsonMessage.payload;
//                 break;
//         }

//     });

//     socket.on("close", () => {
//         console.log("Disconnected from the browser!")
//     });
// });




httpServer.listen(3000, handleListen);





