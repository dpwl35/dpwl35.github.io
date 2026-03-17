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

#### Animation

deltaTime : 이전 프레임과 현재 프레임 사이의 시간 차이  
기기마다 FPS(초당 프레임) 가 다르기 때문에 Delta Time을 사용하여 프레임 속도(FPS)에 관계없이 동일한 속도로 움직이도록 만들어준다.

```javascript
app.ticker.add((delta) => {
  bunny.x += 2 * delta.deltaTime;
  bunny.rotation += delta.deltaTime * 0.1;
  if (bunny.x > app.screen.width) {
    bunny.x = 0;
  }
});
```

#### Group

그룹으로 묶기

```javascript
const container = new Container();
app.stage.addChild(container);
container.x = 200;
container.y = 200;

//생략
const rect = new Graphics();
rect.rect(0, 0, 50, 50);
rect.fill();
container.addChild(rect);

app.ticker.add((delta) => {
  container.rotation += delta.deltaTime * 0.01;
});
```

#### Interaction

pointertap : 모바일 / pc 모두 동작

```javascript
const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
const bunny = new Sprite(texture);
app.stage.addChild(bunny);
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

bunny.eventMode = 'static'; //이벤트모드 설정
bunny.cursor = 'pointer'; //포인터 변경

let n = 1;

bunny.on('pointertap', () => {
  bunny.scale.set(++n);
});
```

#### Filter

필터 적용하기

```javascript
import {
  Application,
  Assets,
  Sprite,
  BlurFilter,
  ColorMatrixFilter,
  DisplacementFilter,
  AlphaFilter,
  NoiseFilter,
} from 'pixi.js';

//생략

const filters = [
  new BlurFilter({ strength: 5 }),
  colorMatrixFilter,
  new DisplacementFilter(filterSprite),
  new AlphaFilter({ alpha: 0.3 }),
  new NoiseFilter({ noise: 0.5 }),
];
bunny.filters = filters[2];
```
