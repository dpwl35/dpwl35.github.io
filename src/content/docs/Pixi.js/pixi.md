---
title: Pixi.js 시작하기
description: PixiJS로 만드는 2D 그래픽
---

## PixiJS 시작하기

```javascript
import * as PIXI from 'pixi.js';

(async () => {
  const app = new PIXI.Application();

  await app.init({
    background: 'royalblue',
    resizeTo: window, //창 전체 만들기
    resolution: window.devicePixelRatio || 1, //해상도 설정
    autoDensity: true, //화면 맞춤
  });

  document.body.appendChild(app.canvas);
})();
```

#### Sprite 만들기

```javascript
const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
const bunny = new Sprite(texture);
app.stage.addChild(bunny);
```

중심기준으로 확대 시키기 / 옮기기  
bunny.x = 100;
bunny.y = 200;

```javascript
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
bunny.anchor.set(0.5);
```

#### Graphics

[examples](https://pixijs.com/8.x/examples?example=graphics_basic_shapes)

```javascript
const border = new Graphics();
border.rect(50, 200, 100, 100);
border.fill('orange');
app.stage.addChild(border);

const line = new Graphics();
line.moveTo(0, 100);
line.lineTo(app.screen.width, 100);
line.stroke({
  color: '#fff',
  width: 5,
});
app.stage.addChild(line);
```
