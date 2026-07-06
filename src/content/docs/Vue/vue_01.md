---
title: Vue 시작하기 1
description: Vue 선언적 렌더링, 조건문과 반복문, 사용자 입력 핸들링
---

## 1. 데이터 바인딩 (`{{ }}`)

js 데이터를 HTML에 꽂아넣는 방법

```vue
<template>
  <div>
    <h4 :style="color">XX 원룸</h4>
    <p>{{ price }} 만원</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      price: 60,
      color: 'color:red',
    };
  },
};
</script>
```

## 2. `v-for` 반복문

사용법 : <태그 v-for="변수 in 횟수" :key="유니크한 값">

```vue
<template>
  <div v-for="(item, i) in product" :key="i">
    <h4>{{ item }}</h4>
  </div>
</template>
```

차이는 `v-if`랑 같이 쓸 때 나온다.

- Vue2: 같은 태그에 `v-for`와 `v-if`를 같이 쓰면 **`v-for`가 먼저 평가**된다. 그래서 필터링하려고 `v-if` 걸어도 일단 배열 전체를 순회한 다음 조건 체크하는 식이라 비효율적이고, 의도치 않게 `item`이 정의 안 된 상태에서 `v-if` 조건이 실행되는 버그가 생기기도 했다.
- Vue3: 반대로 **`v-if`가 먼저 평가**된다. 그래서 같은 엘리먼트에 `v-for` + `v-if`를 같이 쓰는 걸 아예 지양하고, computed로 걸러낸 배열을 `v-for`에 넘기는 방식을 공식적으로 권장한다.

## 3. `v-if` / `v-else` 조건문

문법 동일, 큰 차이 없음.

```vue
<div v-if="isOpen">열림</div>
<div v-else>닫힘</div>
```

다만 Vue3에서는 `<template>` 최상단에 **여러 개의 root 엘리먼트**를 둘 수 있게 되면서(Fragments 지원), 모달 같은 걸 만들 때 굳이 감싸는 `<div>` 하나를 더 안 써도 된다. Vue2는 template 안에 root가 반드시 하나여야 해서, 노트에 있던 모달 예시도 사실 Vue2 기준으로는 저렇게 두 개의 최상위 블록을 못 쓰고 하나의 wrapper로 감싸야 한다.

```vue
<!-- Vue2: root가 1개여야 함 -->
<template>
  <div>
    <div class="black-bg" v-if="isModalOpen">...</div>
    <div>...</div>
  </div>
</template>

<!-- Vue3: root 여러 개 가능 -->
<template>
  <div class="black-bg" v-if="isModalOpen">...</div>
  <div>...</div>
</template>
```

## 4. 이벤트 핸들러

`@click`, `methods` 안에서 `this.데이터명` 쓰는 기본 패턴은 동일.

```vue
<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increase() {
      this.count += 1;
    },
  },
};
</script>
```
