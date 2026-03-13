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
  });

  document.body.appendChild(app.canvas);
})();
```
