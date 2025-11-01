# [[BOJ] 트리](https://www.acmicpc.net/problem/4803)

> [자료 구조] [그래프 이론] [그래프 탐색] [트리] [깊이 우선 탐색] [분리 집합]

## 발상

- dfs를 사용해서 사이클이 있는지 유무 확인

## <br>정답 코드

```js
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let pointer = 0;
let caseNumber = 0;

const dfs = (prev, u, visited, edges) => {
  for (const v of edges[u]) {
    if (v === prev) continue;
    if (visited[v]) return false;
    visited[v] = true;
    if (!dfs(u, v, visited, edges)) return false;
  }
  return true;
};

while (true) {
  const [n, m] = inputs[pointer].split(" ").map(Number);
  if (n === 0 && m === 0) break;

  const edges = Array(n + 1)
    .fill()
    .map(() => Array());

  for (let i = 0; i < m; i++) {
    const [u, v] = inputs[pointer + i + 1].split(" ").map(Number);
    edges[u].push(v);
    edges[v].push(u);
  }
  pointer += m + 1;
  caseNumber += 1;
  const visited = Array(n + 1).fill(false);
  let answer = 0;

  for (let i = 1; i < n + 1; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    const result = dfs(-1, i, visited, edges);
    if (result) answer += 1;
  }

  if (answer > 1) {
    console.log(`Case ${caseNumber}: A forest of ${answer} trees.`);
  } else if (answer === 1) {
    console.log(`Case ${caseNumber}: There is one tree.`);
  } else {
    console.log(`Case ${caseNumber}: No trees.`);
  }
}
```
