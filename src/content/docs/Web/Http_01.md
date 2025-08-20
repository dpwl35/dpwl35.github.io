---
title: 인터넷 네트워크
description: 인터넷 네트워크, URI와 웹 브라우저 요청 흐름
---

## 인터넷 네트워크

<b>인터넷 프로토콜 스택의 4계층</b>  
애플리케이션 계층 - HTTP, FTP  
전송 계층 - TCP, UDP  
인터넷 계층 - IP  
네트워크 인터페이스 계층

<div style="background: #ddd; padding: 1rem;">
<h4>IP패킷</h4>
  <p>출발지 IP, 목적지IP, 기타..</p>
  <div  style="background: #eee; padding: 1rem;">
  <h4>TCP 세그먼트</h4>
    <p>출발지 PORT, 목적지 PORT, 전송 제어, 순서, 검증 정보 ...</p>
    <div style="background: #fff; padding: 1rem;">전송데이터</div>
  </div>
</div>

#### IP 인터넷 프로토콜

1. 비연결성

- 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷이 전송된다.

2. 비신뢰성

- 중간에 패킷이 사라질 수도 있다.
- 패킷 전달 순서 문제 발생

  보통 1500byte가 넘으면 메세지가 끊어서 전달이 된다.

  메시지를 보낼 때 각 끊어진 메시지들이 노드를 타는데 내부적 판단으로 서로 다른 노드를 탈 수 있기 때문에 메시지가 순서대로 전달되지 않을 수도 있다.

#### TCP 전송제어 프로토콜 (전송 제어 프로토콜)

1. 연결지향 TCP 3 way handshake (가상 연결)

- SYN : 접속 요청 → ACK : 요청 수락 (ACK와 함께 데이터 전송 가능)

2. 데이터 전달 보증

3. 순서 보장

신뢰할 수 있는 프로토콜이다. 현재는 대부분 TCP사용.

#### UDP

인터넷을 이미 TCP기반으로 다 쓰고 있기 때문에 개인적으로 최적화 X 대신 UDP로 원하는 대로 최적화할 수 있다.

#### PORT

같은 IP내에서 프로세스를 구분한다.
TCP/IP 패킷에는 출발지 IP, PORT / 목적지 IP, PORT 가 있다.

IP > 하나의 아파트 / PORT > 호수

하나의 아파트에 여러호수

0 ~ 65535 할당 가능

0 ~ 1023 : 잘 알려진 포트, 사용하지 않는 것이 좋다.

- FTP 20, 21

- TELNET 23

- HTTP 80

- HTTPS - 443

#### DNS

도메인 네임 시스템(Domain Name System) : 전화번호부, 도메인 명을 IP주소로 변환  
IP는 기억하기 어렵고 변경될 수 있다. DNS 서버에 도메인 명을 등록할 수 있다.

<br><br>

## URI((Uniform Resource Identifier)) / 웹 브라우저 요청 흐름

  <table>
  <tr> <td colspan="2">URI(Resource Identifier)</td></tr>
  <tr>
    <td>URL(Resource Locator) 리소스가 있는 위치를 지정</td>
    <td>URN(Resource Name) 리소스에 이름을 부여  </td>
  </tr>  
  </table>

위치는 변할 수 있지만, 이름은 변하지 않는다. URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되어 있지 않다.

#### URI

- Uniform: 리소스 식별하는 통일된 방식
- Resource: 자원, URI로 식별할 수 있는 모든 것(제한 없음)
- Identifier: 다른 항목과 구분하는데 필요한 정보

#### URI

- URL - Locator: 리소스가 있는 위치를 지정
- URN - Name: 리소스에 이름을 부여
- 위치는 변할 수 있지만, 이름은 변하지 않는다.
- urn:isbn:8960777331
- URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않음

#### URL 전체 문법

<table>
  <tr>
    <td>https://</td><td>www.google.com</td><td>:443</td><td>/search?</td><td>q=hello&hl=ko</td>
  </tr>
  <tr>
    <td>프로토콜(https)</td><td>호스트명(www.google.com)</td><td>포트번호(443)</td><td>패스(/search)</td><td>쿼리 파라미터(q=hello&hl=ko)</td>
  </tr> 
  </table>

- 프로토콜 : 어떤 방식으로 자원에 접근할 것인가 하는 약속 (ex. http, https, ftp 등등)  
  http는 80 포트 / httpssms 443포트를 주로 사용 : 포트는 생략 가능  
  https는 http에 보안 추가된 것
- path (리소스 경로), 계층적 구조 : 예) /home/file1.jp
- 쿼리 : key=value 형태
- ?로 시작, &로 추가 가능 ?keyA=valueA&keyB=valueB  
  fragment : html 내부 북마크 등에 사용 , 서버에 전송하지 않음

#### 웹 브라우저 요청 흐름

HTTP 요청 메세지

GET /search?q=hello&hl=ko HTTP/1.1 Host: www.google.com

1. 웹 브라우저가 HTTP 메세지 생성
2. SOCKET 라이브러리를 통해 전달
3. TCP / IP 패킷 생성, HTTP 메세지 포함
4. HTTP 응답 메세지

<div style="background: #ddd; padding: 1rem;">
<h4>TCP/IP패킷</h4>
  <p>출발지 IP, 목적지IP, 기타..</p>
  <div  style="background: #eee; padding: 1rem;">
  <h4>HTTP 메세지</h4>
    <p>GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com</p>
  </div>
</div>

<b>HTTP 응답 메시지</b>
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 3423

```html
<html>
  ...
</html>
```
