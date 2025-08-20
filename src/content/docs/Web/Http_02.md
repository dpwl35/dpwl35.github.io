---
title: HTTP의 기본
description: HTTP의 기본, 메서드, 활용, 상태코드 알아보기
---

## HTTP의 기본

HyperText Transfer Protocol :
HTTP 메세지에 모든 것을 전송한다. IMAGE, 음성, 영상, 파일, JSON, XML (API), 거의 모든 형태의 데이터 전송 가능. 서버간에 데이터를 주고 받을 때도 대부분 HTTP 사용한다.

#### HTTP 특징

- 클라이언트 서버 구조  
  Request Response 구조  
  클라이언트는 서버에 요청을 보내고, 응답을 대기  
  서버가 요청에 대한 결과를 만들어서 응답
- 무상태 프로토콜(Stateless), 비연결성
  서버가 클라이언트의 상태를 보존X
  장점: 서버 확장성 높음(스케일 아웃) / 단점: 클라이언트가 추가 데이터 전송

  > Stateful : 상태 유지 중간에 다른 점원으로 바뀌면 안된다. (중간에 다른 점원으로 바뀔 때 상태 정보를 다른 점원에게 미리 알려줘야 한다.)  
  > Stateless : 중간에 다른 점원으로 바뀌어도 된다. 갑자기 클라이언트 요청이 증가해도 서버를 대거 투입할 수 있다. 무상태는 응답 서버를 쉽게 바꿀 수 있다. -> 무한한 서버 증설 가능  
  > Stateless 실무 한계 : 모든 것을 무상태로 설계 할 수 있는 경우도 있고 없는 경우도 있다. (무상태 : 로그인이 필요 없는 단순한 서비스 소개 화면, 상태유지: 로그인화면) 로그인한 사용자의 경우 로그인 했다는 상태를 서버에 유지. 일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태 유지. 상태 유지는 최소한만 사용한다.

- 단순함, 확장 가능
- HTTP 메시지
<table>
<tr><th colspan="2">HTTP 메시지 구조</th></tr>
<tr>
  <td>start-line 시작 라인</td>
  <td>
<b>요청 메시지 - HTTP 메서드</b> <br>
종류: GET, POST, PUT, DELETE... / 서버가 수행해야 할 동작 지정 / GET: 리소스 조회 / POST: 요청 내역 처리

<b>요청 메시지 - 요청 대상</b>  
absolute-path[?query] (절대경로[?쿼리]) <br>
절대경로= "/" 로 시작하는 경로

<b>요청 메시지 - HTTP 버전</b>  
HTTP Version

<b>응답 메세지</b>  
start-line = request-line / status-line<br>
status-line = HTTP-version SP status-code SP reason-phrase CRLF<br>
HTTP 버전<br>
• HTTP 상태 코드: 요청 성공, 실패를 나타냄<br>
• 200: 성공<br>
• 400: 클라이언트 요청 오류<br>
• 500: 서버 내부 오류<br>
• 이유 문구: 사람이 이해할 수 있는 짧은 상태 코드 설명 글

</td>
</tr>
<tr>
<td>header 헤더</td>
<td>
header-field = field-name ":" OWS field-value OWS (OWS:띄어쓰기 허용) <br>
field-name은 대소문자 구문 없음 <br>
용도 : HTTP 전송에 필요한 모든 부가정보 / 예) 메시지 바디의 내용, 메시지 바디의 크기, 압축, 인증, 요청 클라이언트(브라우저) 정보,
서버 애플리케이션 정보, 캐시 관리 정보... / 필요시 임의의 헤더 추가 가능
</td>
</tr>
<tr>
<td colspan="2">empty line 공백 라인 (CRLF)</td></tr>
<tr>
  <td>message body</td>
  <td>용도 : HTML 문서, 이미지, 영상, JSON 등등 byte로 표현할 수 있는 모든 데이터 전송 가능 실제 전송할 데이터</td>
</tr>
</table>

#### 비 연결성

- HTTP는 기본이 연결을 유지하지 않는 모델
- 일반적으로 초 단위의 이하의 빠른 속도로 응답
- 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 이
  하로 매우 작음 > 예) 웹 브라우저에서 계속 연속해서 검색 버튼을 누르지는 않는다.
- 서버 자원을 매우 효율적으로 사용할 수 있음

<b>한계와 극복</b>

- TCP/IP 연결을 새로 맺어야 함 - 3 way handshake 시간 추가
- 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라 자바스크립트, css, 추가 이미지 등
  등 수 많은 자원이 함께 다운로드
- 지금은 HTTP 지속 연결(Persistent Connections)로 문제 해결
- HTTP/2, HTTP/3에서 더 많은 최적화
