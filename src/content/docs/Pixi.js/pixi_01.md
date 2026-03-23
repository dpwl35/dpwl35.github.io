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

#### Sprite Animation

클릭시 애니메이션 재생

```javascript
const texture = await Assets.load('/images/Attack.png');

const frames = [];

for (let i = 0; i < 5; i++) {
  const frame = new Texture({
    source: texture,
    frame: new Rectangle(i * 128, 0, 128, 128),
  });
  frames.push(frame);
}
const zombie = new AnimatedSprite(frames);
app.stage.addChild(zombie);

zombie.animationSpeed = 0.2;
zombie.loop = false; // 한번만 플레이
zombie.eventMode = 'static';
zombie.cursor = 'pointer';
zombie.on('pointertap', () => {
  // 클릭하면 플레이
  zombie.gotoAndPlay(0); // 첫번째 프레임부터 플레이
});
zombie.onComplete = () => {
  // 애니메이션 재싱이 끝나면 처음으로
  zombie.gotoAndStop(0);
};
```

#### Sound

클릭시 사운드 재생

```javascript
const punchSound = new Audio('/sounds/punch.mp3');

zombie.on('pointertap', () => {
  zombie.gotoAndPlay(0);
  punchSound.currentTime = 0;
  punchSound.play();
});
zombie.onComplete = () => {
  zombie.gotoAndStop(0);
};
```

#### Tiling Sprite (Background)

배경 이미지 채우기

```javascript
const bgTexture = await Assets.load('/images/ruins2.png');
const bgSprite = new TilingSprite({
  texture: bgTexture,
  width: app.screen.width,
  height: app.screen.height,
});
app.stage.addChild(bgSprite);
// bgSprite.tileScale.set(0.1);

function adjustTileScale() {
  //이미지 높이 = 브라우저 높이
  const scale = window.innerHeight / bgTexture.height;
  bgSprite.tileScale.set(scale);
  bgSprite.width = window.innerWidth;
  bgSprite.height = window.innerHeight;

  zombie.y = app.screen.height * 0.52 - zombie.height;
}

adjustTileScale();

app.ticker.add((delta) => {
  bgSprite.tilePosition.x -= 2 * delta.deltaTime;
});
```

#### 빌드하기

npm run build
