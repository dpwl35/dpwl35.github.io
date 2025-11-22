---
title: 프로젝트 최적화
description: json 형식 폰트 최적화 하기, 이미지 텍스처 webp로 변환하기
---

## JSON 형식 폰트 최적화 하기

실제 사용되는 문자열 정의 후 최종적으로 필요한 글리프만 포함하는 subset 폰트 JSON을 생성한다.

```javascript
useEffect(() => {
  const fontData = fontjson;
  console.log(fontData);

  // 화면에 실제로 표시할 텍스트
  const targetText = "How to Play↑←↓→";

  // 필요한 글리프만 담을 객체
  const modifiedGlyphs = {};

  for (let i = 0; i < targetText.length; i++) {
    const char = targetText[i];

    // 소문자 → 대문자 대응 등 처리
    const charKey = char in fontData.glyphs ? char : char.toUpperCase();

    // 폰트 JSON에 해당 글리프가 존재하면 추가
    if (charKey in fontData.glyphs) {
      modifiedGlyphs[charKey] = fontData.glyphs[charKey];
    }
  }

  // 기존 fontData에서 glyphs만 교체
  const modifiedFontData = {
    ...fontData,
    glyphs: modifiedGlyphs,
  };

  // 최적화된(서브셋) 폰트 JSON 출력
  console.log(JSON.stringify(modifiedFontData));
}, []);

useEffect(() => {
  console.log(isStart);
}, [isStart]);
```

WebGL/TextGeometry/R3F 텍스트 렌더링에서 파일 크기 감소 → 로딩 개선

## 텍스처 및 이미지 webp로 변환

webgl에 이용되는 모델들의 텍스처 이미지는 웹에서 사용되는 png나 jpg등 일반적인 형식을 사용하며 보통 2배수 크기(1024x1024, 2048x2048등)를 사용한다. 가로/세로 크기를 절반으로만 줄여도 전체 크기는 1/4로 감소한다.  
파일 크기 자체가 감소하기 때문에 네트워크 성능 면에서 이득이 있다. 네트워크 텍스처 이미지를 다운로드한 후에, GPU에서 참조하기 위해 텍스처의 압축을 해제하고 GPU에서 로드할 필요가 있는데 그 과정에서의 딜레이도 줄어들게 된다.

- 보통 png > jpg > webp 이기 때문에 Webp를 사용하는 것이 가장 좋지만 iOS14 이상에서만 사용할 수 있는 제약이 있기 때문에 프로젝트 지원 환경을 먼저 파악할 것.
