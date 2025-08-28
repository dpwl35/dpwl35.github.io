---
title: HTTP 헤더
description: HTTP의 기본, 메서드, 활용, 상태코드 알아보기
---

#### HTTP 헤더의 용도

- HTTP 전송에 필요한 모든 부가정보
- 표준 헤더가 많다.
- 필요시 임의의 헤더 추가 가능

<b>HTTP 표준 1999년 RFC2616x(폐기) → 2014년 RFC7230~7235 등장</b>

#### HTTP BODY

<b>message body - RFC7230(최신)</b>

- 메시지 본문(message body)을 통해 표현 데이터 전달
- 메시지 본문 = 페이로드(payload)
- 표현은 요청이나 응답에서 전달할 실제 데이터
- 표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공
- 데이터 유형(html, json), 데이터 길이, 압축 정보 등등
- 참고: 표현 헤더는 표현 메타데이터와, 페이로드 메시지를 구분해야 하지만, 여기서는 생략

#### 표현

- Content-Type: 표현 데이터의 형식
  미디어 타입, 문자 인코딩
- Content-Encoding: 표현 데이터의 압축 방식
  표현 데이터를 압축하기 위해 사용  
  데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가  
  데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
- Content-Language: 표현 데이터의 자연 언어
  표현 데이터의 자연 언어를 표현
- Content-Length: 표현 데이터의 길이
  바이트 단위  
  Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨
- 표현 헤더는 전송, 응답 둘다 사용

#### 협상(콘텐츠 네고시에이션)

<b>클라이언트가 선호하는 표현 요청</b>

- Accept: 클라이언트가 선호하는 미디어 타입 전달
- Accept-Charset: 클라이언트가 선호하는 문자 인코딩
- Accept-Encoding: 클라이언트가 선호하는 압축 인코딩
- Accept-Language: 클라이언트가 선호하는 자연 언어

#### 협상과 우선순위1

- Quality Values(q) 값 사용
- 0~1, 클수록 높은 우선순위
- 생략하면 1
- Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7  
  • 1. ko-KR;q=1 (q생략)  
  • 2. ko;q=0.9  
  • 3. en-US;q=0.8  
  • 4. en;q=0.7

#### 협상과 우선순위2

- 구체적인 것이 우선한다.
- Accept: text/_, text/plain, text/plain;format=flowed, _/\*
  1. text/plain;format=flowed
  2. text/plain
  3. text/\*
  4. _/_

#### 협상과 우선순위3

구체적인 것을 기준으로 미디어 타입을 맞춘다.

#### 전송 방식

- 단순 전송
- 압축 전송
- 분할 전송
- 범위 전송

#### 일반 정보

From: 유저 에이전트의 이메일 정보  
Referer: 이전 웹 페이지 주소  
User-Agent: 유저 에이전트 애플리케이션 정보  
Server: 요청을 처리하는 오리진 서버의 소프트웨어 정보  
Date: 메시지가 생성된 날짜

#### 특별한 정보

Host: 요청한 호스트 정보(도메인)  
Location: 페이지 리다이렉션  
Allow: 허용 가능한 HTTP 메서드  
Retry-After: 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간

#### 인증

Authorization: 클라이언트 인증 정보를 서버에 전달  
WWW-Authenticate: 리소스 접근시 필요한 인증 방법 정의

#### 쿠키

Set-Cookie: 서버에서 클라이언트로 쿠키 전달(응답)  
Cookie: 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달

<b>Stateless</b>
HTTP는 무상태(Stateless) 프로토콜이다.  
클라이언트와 서버가 요청과 응답을 주고 받으면 연결이 끊어진다.  
클라이언트가 다시 요청하면 서버는 이전 요청을 기억하지 못한다.  
클라이언트와 서버는 서로 상태를 유지하지 않는다.
