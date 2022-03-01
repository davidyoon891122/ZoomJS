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
