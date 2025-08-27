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
