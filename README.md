# Noom
Zoom Clone using NodeJS, WebRTC and Websockets

# 프로젝트 설정 설명
+ Nodemone: 소스 파일 변경 시 자동으로 서버 재시작 해주는 프로그램
+ Balel: 작성한 코드를 일반 NodeJS 코드로 컴파일 (Babel is a javascript compiler)
+ 현 프로젝트에서는 서버를 재시작하는 대신에 babel-node를 실행 "babel-node src/server.js"
+ server.js 파일은 express를 사용하여 어플리케이션을 구성
    - view engine으로 Pug를 설정하고 app.set("view engine", "pug")
    - pug: node.js 및 브라우저 용 javascript로 구현 된 고성능 템플릿 엔진, "Jade" 였다가 상표권 문제로 pug로 변경
    - views 디렉토리를 설정한다 app.set("views", __dirname + "/views");
    - app.use("/public", express.static(__dirname + "/public")); FrontEnd에서 구동되는 코드
    - 프로트, 백을 구분하기 위해서 public폴더 생성 후 프로트 분리 app.js는 프론트 앤드 server.js는 백 앤드
    - app.get("/", (req, res) => res.render("home")); // 템플릿을 렌더해주는 코드 get / 하면 home.pugfh 렌더링
+ MVP CSS
    - link(rel="stylesheet" href="https://unpkg.com/mvp.css")
    - 기본 html 태그들을 심플하고 이쁘게 꾸며주는 오픈소스

# 설정 추가 옵션
+ app.get("/*", (req, res) => res.redirect("/")); 모든 요청 URL을 디폴트로 리다이렉션


# HTTP VS WebSocket
## HTTP
+ Request, Response로 구성되며, 비 연결형 통신 프로토콜이다
+ stateless: backend가 유저를 기억하지 못한다 -> 클라이언트와 서버 사이에 아무런 연결이 없다
+ 이렇게 서버가 유저를 잊어버리는 것을 stateless라 한다
## WebSocket
+ wss://example.com 웹소켓을 지원하는 서버에 웹소켓으로 연결할 때 
+ Secure Web Socket (WSS) Web Socket Secure ?
+ WebSocket 연결이 일어날 때 마치 악수하는 것처럼 작동한다
+ 브라우저가 서버로 webSocket request를 보내면, 서버가 받거나 거절하거나 한다
+ 요청이 승인되고 악수(Handshake)가 성립되면, 연결(establish)은 성립 된다
+ Handshake란 손과 손이 연결되었다는 뜻이다
+ 연결이 유지되고 있기 때문에, 서버는 클라이언트가 누구인지 알 수 기억할 수 있다
+ 서버는 유저에게 원할 때 메시지를 보낼 수 있다
+ 서버는 리스폰스를 받지 않아도 여러개의 메시지를 보낼 수 있고, 유저는 메시지 한 개만 보내고 나머지는 무시할 수 있다.(bi-directional)

# ws Socket Communication
+ server 에서의 동작
    * const server = http.createServer(app) // HTTP 서버를 만듬
    * const ws = new WebSocket({ server }) // http 서버를 인자로 넣어서 소켓 서버 생성
    * we.on('connection', (socket) => {}) // ws.on('connection')으로 서버를 열고 접속한 클라이언트를 socket으로 받아서 여러 가지 이벤트 실행
    * socket.send() // 소켓에 메시지 전달
    * socket.on("message", (message) => message.toString()) // 소켓으로 부터 메시지 전달받음 toString으로 바이너리를 변경해주어야 함(브라우저에서 바이너리로 변경해서 메시지 던짐)
    * socket.on("close") // 클라이언트 소켓이 닫혔을 때 이벤트 처리
+ client 에서의 동작
    * client js 파일 app.js에 코드 작성
    * 소켓 생성 const socket = new WebSocket(`ws://${window.location.host}');  // window.location.host로 주소 전달
    * socket.addEventHandler("open", () => {}) // 소켓 오픈 되었을 떄 이벤트 처리
    * socket.addEventHandler("message", (message) => {}) // 서버로 부터 메시지 받았을 때 이벤트 처리
    * socket.addEventHandler("close", () => {}) // 서버 접속 끊겼을 때 이벤트 처리
    * setTimeout(() => { socket.send()}, 5000); // setTimeout으로 5초 후 메시지 서버로 전송

# socket io
+ socket io is a libary that enables low-latency, bidirectional and event-based communication between a client and a server
+ npm i socket.io로 설치
+ ws의 프로토콜 위에서 동작하도록 만들어 졌으며 websocket이 불가할 때는 HTTP long-polling 또는 자동 재접속으로 추가적인 가능을 제공해주는 프레임워크
+ const httpServer = http.createServer(app);
+ const ioServer = SocketIO(httpServer); // http서버와 동시에 사용 가능
+ 사용법
    * ServerSide
    * ioServer.on("connection", socket => {
        socket.on("room", (0~n-1까지는 메시지, n은 콜백 함수로 사용 가능) => {
            consol.log(roomName);
            setTimeout(() => {
                callbackFunc("Message");
            }, 5000);
        });
    });
    * ClientSide
    * pug 파일
        - script(src="/socket.io/socket.io.js) 추가 실행
    * app.js 파일
        - const socket = io();
        - socket.emit("room_name", input.value, callBackFunction)
        - 콜백 함수는 서버의 있는 함수가 실행되는 것이 아니라 서버가 클라이언트 사이드 app.js에 있는 함수를 실행시키는 것이다!
        

    