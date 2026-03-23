---
title: Pixi.js 효과
description: PixiJS로 만드는 2D 그래픽2
---

## 물결 효과

console.log(plane.geometry.getAttribute('aPosition'));
console.log(buffer.data);

```javascript
const texture = await Assets.load('/images/flag.jpg');
const plane = new MeshPlane({
  texture,
  verticesX: 10,
  verticesY: 10,
});
plane.width = 426;
plane.height = 640;
plane.x = 30;
plane.y = 30;
app.stage.addChild(plane);

const { buffer } = plane.geometry.getAttribute('aPosition');

let timer = 0;
app.ticker.add(() => {
  for (let i = 0; i < buffer.data.length; i++) {
    buffer.data[i] += Math.sin(timer * 0.1 + i) * 0.5;
  }
  buffer.update();
  timer++;
});
```
