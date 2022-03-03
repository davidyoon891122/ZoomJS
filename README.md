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
