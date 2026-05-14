---
title: SQL 저장 객체
description: SQL 저장 객체
---

## 저장 프로시저

저장 객체를 통해 SQL의 단점을 보완

#### 저장 객체의 이해

저장 객체의 정의

- SQL 문을 확장하여 절차적으로 처리하기 위한 기능을 제공하는 언어
- SQL/PSM(Persistent Stored Module) 기반의 확장 언어

```sql
-- 형식 정의
CREATE PROCEDURE do_repeat (param1 INT)
-- 기능 정의
BEGIN
  SET @x = 0;
  REPEAT
    SET @x = @x + 1;
  UNTIL @x > param1
  END REPEAT;
END;
```

#### 저장 객체의 종류

- 저장 프로시저
  자주 사용되거나 복잡한 과정을 거치는 SQL문을 저장하여 하나의 개체로 관리
- 함수
  저장 프로시저와 유사, 결과값을 반환하는 기능 제공  
  SELECT 문에 포함되어 실행
- 트리거
  데이터 갱신 시 지정된 애플리케이션이 동작 또는 다른 테이블의 데이터를 변경

#### 저장 프로시저의 생성

```sql
-- 생성 구문형식
CREATE [DEFINER {사용자 | 현재사용자} ]
  PROCEDURE 프로시저명 ( [매개변수[, ...]] )
BEGIN
  SQL문
  ⋮
END
-- 매게변수 정의
[ IN | OUT | INOUT ] 매개변수명 데이터타입
```

저장 프로시저 생성

```sql
DELIMITER $$
CREATE PROCEDURE GetStudentByGender()

BEGIN
  SELECT 성별, COUNT(*) FROM 학생
    GROUP BY 성별;
END $$
DELIMITER ;
```

문장 구분자

- DELIMITER는 개별 SQL 문 구분하는 구분자 정의
- BEGIN-END 블록 내에 SQL 문과 기능 정의 부분의 구분자 구별 필요

저장 프로시저의 호출

```sql
CALL 저장 프로시저명([매개변수[,...]]);
-- or
CALL 저장 프로시저명[()];
```

저장 프로시저의 수정

- ALTER PROCEDURE 명령을 사용
- 보안 및 동작 방식에 대한 속성을 변경할 때만 사용
- 삭제 후 재생성 → 모든 저장 객체 동일

저장 프로시저의 삭제

```sql
DROP PROCEDURE 프로시저명;
DROP PROCEDURE GetStudentByGender;
```

#### 매개변수의 사용

매개변수의 역할

- 외부로부터 주어지는 값이나 기본값을 매개변수를 통해 저장 프로시저로 전달
- 저장 프로시저를 실행한 결과값을 반환

IN, OUT, INOUT 세 타입의 매개변수를 제공

- IN : 기본타입, 외부로부터 값을 전달
- OUT : 반환값을 저장
- INOUT : IN과 OUT의 목적으로 모두 사용

매개변수의 활용 IN

```sql
-- 생성
DELIMITER $$
CREATE PROCEDURE GetBalancebyNameBirth(
    IN name VARCHAR(20), IN birth DATE)
BEGIN
  SELECT 잔액 FROM 학생, 계좌
    WHERE 학생.학생번호 = 계좌.학생번호 AND
          학생.학생이름 = name AND 학생.생년월일 = birth;
END $$
DELIMITER ;
-- 호출
CALL GetBalancebyNameBirth('안종근', '1979-09-02')
```

매개변수의 활용 - OUT

```sql
DELIMITER $$
CREATE PROCEDURE GetPhoneByStudentID(
    IN  sid CHAR(13),
    OUT phone CHAR(15))
BEGIN
    SELECT 전화번호 INTO phone FROM 학생
        WHERE 학생번호 = sid;
END $$
DELIMITER ;

CALL GetPhoneByStudentID('202034-596541', @phone);
SELECT @phone;
```

변수의 사용

- 사용자 정의 변수: @ 시작, 별도 선언 없이 사용
- 로컬 변수: 저장 객체 내에서만 사용, DECLARE로 선언

```sql
DECLARE 변수명[, ...] 데이터타입[(크기)] [DEFAULT 기본값];
```

변수값 할당

```sql
-- SET 명령
DECLARE total_count INT DEFAULT 0;
SET total_count = 10;

-- SELECT INTO 문 (숫자 타입만 가능)
DECLARE total_student INT DEFAULT 0;
SELECT COUNT(*) INTO total_student FROM 학생;
```

선택 구조 - IF

```sql
IF 조건식 THEN
    SQL문
[ELSEIF 조건식 THEN
    SQL문]
[ELSE
    SQL문]
END IF;
```

IF문의 활용

```sql
DELIMITER $$
CREATE PROCEDURE GetGradeByCredit(
    IN  sID CHAR(13),   -- 학생번호
    OUT nGrade TINYINT) -- 학년
BEGIN
    DECLARE nTotalCredit SMALLINT;  -- 총 이수학점
    SELECT SUM(이수학점) INTO nTotalCredit FROM 전공
        WHERE 학생번호 = sID;
    IF nTotalCredit > 120 THEN
        SET nGrade = 4;
    ELSEIF (nTotalCredit > 80 AND nTotalCredit < 120) THEN
        SET nGrade = 3;
    ELSEIF (nTotalCredit > 40 AND nTotalCredit < 80) THEN
        SET nGrade = 2;
    ELSE
        SET nGrade = 1;
    END IF;
END$$
DELIMITER ;

CALL GetGradeByCredit('202026-590930', @grade);
SELECT @grade
```

선택 구조 CASE  
다중 IF ELSE문을 간편하게 사용하기 위한 명령어

```sql
CASE 변수
    WHEN 비교변수값1 THEN SQL문
    [WHEN 비교변수값2 THEN SQL문]
    ...
    [ELSE SQL문]
END CASE;

CASE
    WHEN 조건식1 THEN SQL문
    [WHEN 조건식2 THEN SQL문]
    ...
    [ELSE SQL문]
END CASE;
```

CASE 문의 활용

```sql
DELIMITER $$
CREATE PROCEDURE GetRoomSize(
    IN  sClassCode CHAR(5),      -- 과목코드
    OUT sClassSize VARCHAR(20))  -- 강의실 규모
BEGIN
    DECLARE nClassVolumn INT;  -- 신청자수
    SELECT COUNT(*) INTO nClassVolumn FROM 수강
        WHERE 과목코드 = sClassCode;
    CASE
        WHEN nClassVolumn > 4 THEN
            SET sClassSize = '대강의실';
        WHEN (nClassVolumn > 2 AND nClassVolumn < 4) THEN
            SET sClassSize = '중강의실';
        ELSE
            SET sClassSize = '소강의실';
    END CASE;
END$$
DELIMITER ;

CALL GetRoomSize('COM12', @size);
SELECT @size;
```

반복 구조

- MySQL은 특정 SQL문을 주어진 조건이 만족하는 동안 특정 구간을 반복시킬 수 있는 세가지 구문을 제공
  WHILE / REPEAT / LOOP
- 반복문 안에서 반복 작업을 제어하기 위해 LEAVE와 ITERATE 문을 사용
  - LEAVE 반복 종료 (break)
  - ITERATE — 현재 반복 구간 중단 후 조건 재검사 (continue) 반복 여부 판별

WHILE 문의 활용

```sql
CREATE PROCEDURE GetFirstCourse(
    IN  sCourseCode CHAR(5),
    OUT sPrerequisite CHAR(5))
BEGIN
    DECLARE sInputCourse CHAR(5);
    SET sInputCourse = sCourseCode;
    pre: WHILE true DO
        SELECT 선수과목 INTO sPrerequisite FROM 과목
            WHERE 과목코드 = sCourseCode;
        IF sPrerequisite IS NOT NULL THEN
            SET sCourseCode = sPrerequisite;
            SET sPrerequisite = NULL;
        ELSE
            LEAVE pre;
        END IF;
    END WHILE;
    IF sCourseCode = sInputCourse THEN
        SET sPrerequisite = NULL;
    ELSE
        SET sPrerequisite = sCourseCode;
    END IF;
END$$

CALL GetFirstCourse('COM31', @code);
SELECT @code;
-- 결과: COM12
-- 흐름: 데이터베이스시스템(COM31) → 자료구조(COM24) → 파이썬 프로그래밍 기초(COM12)
```

## 함수

함수의 이해

- DBMS는 문자함수, 숫자함수, 날짜함수, 집계함수 등 제공
- 사용자가 직접 정의하는 사용자 정의 함수 기능 제공
- 저장 프로시저와 함수의 차이
  - 저장 프로지서는 OUT 매개변수를 통해 결과를 반환, 함수는 RETURN문에 의해 특정 값을 반환
  - 저장 프로시저는 CALL 명령에 의해 실행되나, 함수는 SELECT문에 포함되어 실행(호출)

함수의 생성

```sql
CREATE
    [DEFINER {사용자|현재사용자}]
    FUNCTION 함수명([매개변수[, ...]])
        RETURNS 데이터타입
        [Characteristic]
BEGIN
    SQL문
END
```

매개변수: IN 타입만 사용 가능  
Characteristic: NO SQL / READ SQL DATA / MODIFIES SQL DATA

```sql
DELIMITER $$
CREATE FUNCTION GetInterestRate(nBalance INT)
    RETURNS DECIMAL(4, 2)
    READS SQL DATA
BEGIN
    DECLARE fIR DECIMAL(4, 2);

    IF nBalance >= 500000 THEN
        SET fIR = 0.03;
    ELSEIF (nBalance >= 100000 AND nBalance < 500000) THEN
        SET fIR = 0.02;
    ELSEIF (nBalance < 100000) THEN
        SET fIR = 0.01;
    ELSE
        SET fIR = 0.0;
    END IF;
    RETURN (fIR);
END$$
DELIMITER ;
```

## 트리거

트리거의 이해

- 데이터 변경 시 자동으로 지정된 애플리케이션이 동작하거나 다른 테이블의 데이터를 변경하도록 설계된 저장 프로시저의 특별한 형태
- 역할:
  전체적인 데이터베이스의 무결성과 일관성 유지  
  조건에 따른 데이터 적합성 검사  
  연속적 트리거 실행 시 광범위한 참조 무결성 검사 가능

트리거의 종류

트리거 이벤트와 트리거 시점으로 구분

- 트리거 이벤트: 자동으로 반응하는 SQL 문
- 트리거 시점: 트리거가 실행될 시점을 명시

| 트리거 이벤트 | 실행시점 | 기능                                 |
| :-----------: | :------: | :----------------------------------- |
|    INSERT     |  BEFORE  | 테이블에 데이터가 입력되기 전에 실행 |
|    INSERT     |  AFTER   | 테이블에 데이터가 입력된 후에 실행   |
|    UPDATE     |  BEFORE  | 테이블의 데이터가 수정되기 전에 실행 |
|    UPDATE     |  AFTER   | 테이블의 데이터가 수정된 후에 실행   |
|    DELETE     |  BEFORE  | 테이블의 데이터가 삭제되기 전에 실행 |
|    DELETE     |  AFTER   | 테이블의 데이터가 삭제된 후에 실행   |

트리거 생성

```sql
CREATE TRIGGER 트리거이름
    트리거시점 트리거이벤트 ON 테이블이름
    FOR EACH ROW
BEGIN
    SQL문
END
```

OLD — 변경이 가해지기 전의 레코드  
NEW — 변경이 가해진 후의 레코드

트리거 활용

```sql
DELIMITER $$
CREATE TRIGGER before_과목_update
    BEFORE UPDATE ON 과목
    FOR EACH ROW

BEGIN
    IF NEW.학점 < 1 THEN
        SET NEW.학점 = 1;
    ELSEIF NEW.학점 > 3 THEN
        SET NEW.학점 = 3;
    END IF;
END $$
DELIMITER ;

-- 학점을 5로 바꾸려 해도 트리거가 3으로 제한
UPDATE 과목
    SET 학점 = 5
    WHERE 과목코드 = 'COM34';
SELECT * FROM 학생;
-- COM34 알고리즘의 학점은 3으로 유지됨
```
