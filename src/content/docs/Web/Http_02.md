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

## HTTP 메서드

가장 중요한 것은 리소스 식별이다.

#### API URI

리소스의 의미는?
회원을 등록하고 수정하고 조회하는게 리소스가 아니다. <b>회원이라는 개념 자체가 바로 리소스 </b>  
리소스 : 회원  
행위 : 조회, 등록, 삭제, 변경  
리소스는 명사, 행위는 동사

#### HTTP 메서드 종류

주요 메서드

- GET: 리소스 조회
  - 리소스 조회
  - 서버에 전달하고 싶은 데이터는 query를 통해서 전달
  - 메세지 바디를 사용해서 데이터를 전달할 수 있지만 지원하는 고싱 많아서 권장X
- POST: 요청 데이터 처리, 주로 등록에 사용
  - <b>메시지 바디를 통해 서버로 요청 데이터 전달</b>
  - 서버는 요청 데이터를 처리 : 메시지 바디를 통해 들어온 데이터를 처리하는 모든 기능을 수행
  - 주로 전달된 데이터로 신규 리소스 등록, 프로세스 처리에 사용
- PUT: 리소스를 대체, 해당 리소스가 없으면 생성
  - 리소스를 대체 / 리소스가 없으면 생성 / 쉽게 이야기해서 덮어버림
  - <b>클라이언트가 리소스를 식별</b> : 클라이언트가 리소스 위치를 알고 URI 지정
- PATCH: 리소스 부분 변경
- DELETE: 리소스 삭제

기타 메서드

- HEAD: GET과 동일하지만 메시지 부분을 제외하고, 상태 줄과 헤더만 반환
- OPTIONS: 대상 리소스에 대한 통신 가능 옵션(메서드)을 설명(주로 CORS에서 사용)
- CONNECT: 대상 리소스로 식별되는 서버에 대한 터널을 설정
- TRACE: 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행

#### HTTP 메서드 속성

- 안전(Safe Methods)
  - 호출해도 리소스를 변경하지 않는다.
  - Q: 그래도 계속 호출해서, 로그 같은게 쌓여서 장애가 발생하면요? / A: 안전은 해당 리소스만 고려한다. 그런 부분까지 고려하지 않는다.
- 멱등(Idempotent Methods)
  - f(f(x)) = f(x)
  - 한 번 호출하든 두 번 호출하든 100번 호출하든 결과가 똑같다
  - 멱등 메서드  
    GET: 한 번 조회하든, 두 번 조회하든 같은 결과가 조회된다.  
    PUT: 결과를 대체한다. 따라서 같은 요청을 여러번 해도 최종 결과는 같다.  
    DELETE: 결과를 삭제한다. 같은 요청을 여러번 해도 삭제된 결과는 똑같다.  
    POST: 멱등이 아니다! 두 번 호출하면 같은 결제가 중복해서 발생할 수 있다.  
    활용 : 자동 복구 메커니즘
- 캐시가능(Cacheable Methods)

  - 응답 결과 리소스를 캐시해서 사용해도 되는가?
  - GET, HEAD, POST, PATCH 캐시가능
  - 실제로는 GET, HEAD 정도만 캐시로 사용

## HTTP 메서드 활용

#### 클라이언트에서 서버로 데이터 전송

- 전송방식 : 쿼리 파라미터를 통한 데이터 전송 / 메세지 바디를 통한 데이터 전송
- 4가지 상황  
  정적 데이터 조회 : 이미지, 정적 텍스트 문서  
  동적 데이터 조회 : 주로 검색, 게시판 목록에서 정렬 필터(검색어)  
  HTML Form을 통한 데이터 전송 : 회원 가입, 상품 주문, 데이터 변경  
  HTTP API를 통한 데이터 전송 : 회원 가입, 상품 주문, 데이터 변경, 서버 to 서버, 앱 클라이언트, 웹 클라이언트(Ajax)

#### HTML Form 데이터 전송

- HTML Form submit시 POST 전송 : 예) 회원 가입, 상품 주문, 데이터 변경
- Content-Type: application/x-www-form-urlencoded 사용  
  form의 내용을 메시지 바디를 통해서 전송(key=value, 쿼리 파라미터 형식)  
  전송 데이터를 url encoding 처리 : 예) abc김 -> abc%EA%B9%80
- HTML Form은 GET 전송도 가능
- Content-Type: multipart/form-data  
  파일 업로드 같은 바이너리 데이터 전송시 사용  
  다른 종류의 여러 파일과 폼의 내용 함께 전송 가능(그래서 이름이 multipart)
- 참고: HTML Form 전송은 GET, POST만 지원

#### HTTP API 데이터 전송

- 서버 to 서버 : 백엔드 시스템 통신
- 앱 클라이언트 : 아이폰, 안드로이드
- 웹 클라이언트 : HTML에서 Form 전송 대신 자바 스크립트를 통한 통신에 사용(AJAX)
- POST, PUT, PATCH : 메세지 바디를 통해 데이터 전송
- GET : 조회, 쿼리 파라미터로 데이터 전달
- Content-Type : application/json을 주로 사용 (사실상 표준 TEXT, XML, JSON 등등)

#### HTTP API 설계 예시

- HTTP API - 컬렉션 : POST 기반 등록 예) 회원 관리 API 제공
- HTTP API - 스토어 : PUT 기반 등록 예) 정적 컨텐츠 관리, 원격 파일 관리
- HTML FORM 사용 : 웹 페이지 회원 관리, GET, POST만 지원

<b>API 설계 - POST 기반 등록</b>  
회원 목록 /members -> GET  
회원 등록 /members -> POST  
회원 조회 /members/{id} -> GET  
회원 수정 /members/{id} -> PATCH, PUT, POST  
회원 삭제 /members/{id} -> DELETE

<b>POST - 신규 자원 등록 특징</b>

- 클라이언트는 등록될 리소스의 URI를 모른다.
  - 회원 등록 /members -> POST  
    POST /members
- 서버가 새로 등록된 리소스 URI를 생성해준다.
  - HTTP/1.1 201 Created
  - Location: /members/100
- 컬렉션(Collection)
  서버가 관리하는 리소스 디렉토리
  서버가 리소스의 URI를 생성하고 관리
  여기서 컬렉션은 /members

<b>API 설계 - PUT 기반 등록</b>  
파일 목록 /files -> GET  
파일 조회 /files/{filename} -> GET  
파일 등록 /files/{filename} -> PUT  
파일 삭제 /files/{filename} -> DELETE  
파일 대량 등록 /files -> POST

<b>PUT - 신규 자원 등록 특징</b>

- 클라이언트가 리소스 URI를 알고 있어야 한다.
  파일 등록 /files/{filename} -> PUT  
   PUT /files/star.jpg
- 클라이언트가 직접 리소스의 URI를 지정한다.
- 스토어(Store)
  클라이언트가 관리하는 리소스 저장소
  클라이언트가 리소스의 URI를 알고 관리
  여기서 스토어는 /files

<b>HTML FORM 사용</b>  
HTML FORM은 GET, POST만 지원  
AJAX 같은 기술을 사용해서 해결 가능 -> 회원 API 참고  
여기서는 순수 HTML, HTML FORM 이야기  
GET, POST만 지원하므로 제약이 있음  
<br>
회원 목록 /members -> GET  
회원 등록 폼 /members/new -> GET  
회원 등록 /members/new, /members -> POST  
회원 조회 /members/{id} -> GET  
회원 수정 폼 /members/{id}/edit -> GET  
회원 수정 /members/{id}/edit, /members/{id} -> POST  
회원 삭제 /members/{id}/delete -> POST  
<br>
HTML FORM은 GET, POST만 지원  
컨트롤 URI :  
GET, POST만 지원하므로 제약이 있음  
이런 제약을 해결하기 위해 동사로 된 리소스 경로 사용  
POST의 /new, /edit, /delete가 컨트롤 URI  
HTTP 메서드로 해결하기 애매한 경우 사용(HTTP API 포함)

#### 정리

- HTTP API - 컬렉션  
  POST 기반 등록  
  서버가 리소스 URI 결정
- HTTP API - 스토어  
  PUT 기반 등록  
  클라이언트가 리소스 URI 결정
- HTML FORM 사용  
  순수 HTML + HTML form 사용  
  GET, POST만 지원

<b>참고하면 좋은 URI 설계 개념</b>

- 문서(document)
  단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row)  
  예) /members/100, /files/star.jpg
- 컬렉션(collection)  
  서버가 관리하는 리소스 디렉터리  
  서버가 리소스의 URI를 생성하고 관리  
  예) /members
- 스토어(store)  
  클라이언트가 관리하는 자원 저장소  
  클라이언트가 리소스의 URI를 알고 관리  
  예) /files
- 컨트롤러(controller), 컨트롤 URI  
  문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행  
  동사를 직접 사용  
  예) /members/{id}/delete

## HTTP 상태코드

1xx (Informational): 요청이 수신되어 처리중

- 2xx (Successful): 요청 정상 처리  
  200 OK : 요청 성공  
  201 Created : 요청 성공해서 새로운 리소스 생성  
  202 Accepted : 요청 접수 되었으나 처리 완료X 배치 처리 같은 곳에서 사용  
  204 No Content : 서버가 요청을 성공적으로 수행했지만, 응답 페이로드 본문에 보낼 데이터가 없음
- 3xx (Redirection): 요청을 완료하려면 추가 행동이 필요
  리다이렉션 종류  
  영구 리다이렉션 : 특정 리소스의 URI가 영구적으로 이동  
  일시 리다이렉션 : 일시적인 변경  
  특수 리다이렉션 : 결과 대신 캐시를 사용
- 4xx (Client Error): 클라이언트 오류, 잘못된 문법등으로 서버가 요청을 수행할 수 없음
- 5xx (Server Error): 서버 오류, 서버가 정상 요청을 처리하지 못함

> 모르는 상태 코드가 나타나면?
> 클라이언트는 상위 상태코드로 해석해서 처리
