# [[BOJ] 타임머신](https://www.acmicpc.net/problem/11657)

> [그래프 이론] [최단 경로] [벨만-포드]

## 발상

- 벨만포드 사용

## <br>정답 코드

```js
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const INF = Infinity;
const [N, M] = inputs[0].split(" ").map(Number);
const distances = Array(N + 1).fill(INF);
const edges = [];

distances[1] = 0;

for (let i = 0; i < M; i++) {
  edges.push(inputs[i + 1].split(" ").map(Number));
}

let hasCycle = false;

for (let i = 0; i < N - 1; i++) {
  for (const edge of edges) {
    const [u, v, w] = edge;
    if (distances[u] !== INF && distances[u] + w < distances[v]) {
      distances[v] = distances[u] + w;
    }
  }
}

for (const edge of edges) {
  const [u, v, w] = edge;
  if (distances[u] !== INF && distances[u] + w < distances[v]) {
    hasCycle = true;
  }
}

if (hasCycle) {
  console.log(-1);
} else {
  for (let i = 2; i < N + 1; i++) {
    const distance = distances[i];
    if (distance === INF) {
      console.log(-1);
    } else console.log(distance);
  }
}
```
