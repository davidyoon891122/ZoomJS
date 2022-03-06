import express from "express";
import http from "http"
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000, ws://localhost:3000`);

const server = http.createServer(app); // server for http
const wss = new WebSocket.Server({ server }) // http, web server를 동시에 돌리기 위함


const sockets = [];


wss.on('connection', (socket) => {
    sockets.push(socket); // add socket to queue
    console.log("Connected to Browser !");

    socket.on("message", (message) => {
        console.log("New message: ", message.toString());
        
        sockets.forEach(socket => {
            socket.send(message.toString());
        })
        //socket.send(message.toString());

    });

    socket.on("close", () => {
        console.log("Disconnected from the browser!")
    });
});


server.listen(3000, handleListen);





