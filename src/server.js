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

server.listen(3000, handleListen);





