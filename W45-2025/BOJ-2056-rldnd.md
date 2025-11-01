# [[BOJ] 작업](https://www.acmicpc.net/problem/2056)

> [다이나믹 프로그래밍] [그래프 이론] [방향 비순환 그래프] [위상 정렬]

## 발상

- 위상정렬을 사용하면서, queue에 작업시간을 기록하면 되겠다.

## <br>틀린 풀이 코드 및 틀린 이유

- 0, 1이 끝나야 2가 시작한다고 가정할때 0을 처리하고 1을 처리하게 되면 0의 작업시간은 고려되지 않음

```js
class Deque {
  constructor() {
    this.head = 0;
    this.tail = -1;
    this.data = {};
    this.size = 0;
  }

  get length() {
    return this.size;
  }

  push(value) {
    this.tail += 1;
    this.data[this.tail] = value;
    this.size += 1;
    return this.size;
  }

  pop() {
    if (!this.length) return;
    const result = this.data[this.tail];
    delete this.data[this.tail];
    this.tail -= 1;
    this.size -= 1;
    return result;
  }

  pushFront(value) {
    this.head -= 1;
    this.data[this.head] = value;
    this.size += 1;
    return this.size;
  }

  popFront() {
    if (!this.length) return;
    const result = this.data[this.head];
    delete this.data[this.head];
    this.head += 1;
    this.size -= 1;
    return result;
  }
}

const INF = Infinity;

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(inputs[0]);
const weights = Array(N).fill(INF);
const graph = Array(N)
  .fill()
  .map(() => Array());
const inorder = Array(N).fill(0);

for (let i = 0; i < N; i++) {
  const n = i + 1;
  const line = inputs[n].split(" ").map(Number);
  weights[i] = line[0];

  for (const u of line.slice(2)) {
    graph[u - 1].push(i);
    inorder[i] += 1;
  }
}

const deque = new Deque();
let answer = 0;

for (const index in inorder) {
  if (!inorder[index]) {
    deque.push([index, weights[index]]);
    answer = Math.max(weights[index], answer);
  }
}

while (deque.length > 0) {
  const [u, weight] = deque.popFront();
  for (const v of graph[u]) {
    inorder[v] -= 1;
    if (!inorder[v]) {
      deque.push([v, weight + weights[v]]);
      answer = Math.max(answer, weight + weights[v]);
    }
  }
}

console.log(answer);
```

## <br>정답 코드

- DP 테이블을 만들어 해당 노드까지 오는데 걸리는 최대 시간을 기록

```js
class Deque {
  constructor() {
    this.head = 0;
    this.tail = -1;
    this.data = {};
    this.size = 0;
  }

  get length() {
    return this.size;
  }

  push(value) {
    this.tail += 1;
    this.data[this.tail] = value;
    this.size += 1;
    return this.size;
  }

  pop() {
    if (!this.length) return;
    const result = this.data[this.tail];
    delete this.data[this.tail];
    this.tail -= 1;
    this.size -= 1;
    return result;
  }

  pushFront(value) {
    this.head -= 1;
    this.data[this.head] = value;
    this.size += 1;
    return this.size;
  }

  popFront() {
    if (!this.length) return;
    const result = this.data[this.head];
    delete this.data[this.head];
    this.head += 1;
    this.size -= 1;
    return result;
  }
}

const INF = Infinity;

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(inputs[0]);
const weights = Array(N).fill(INF);
const graph = Array(N)
  .fill()
  .map(() => Array());
const inorder = Array(N).fill(0);
const DP = Array(N).fill(0);

for (let i = 0; i < N; i++) {
  const n = i + 1;
  const line = inputs[n].split(" ").map(Number);
  weights[i] = line[0];

  for (const u of line.slice(2)) {
    graph[u - 1].push(i);
    inorder[i] += 1;
  }
}

const deque = new Deque();

for (const index in inorder) {
  if (!inorder[index]) {
    deque.push(index);
    DP[index] = weights[index];
  }
}

while (deque.length > 0) {
  const u = deque.popFront();
  for (const v of graph[u]) {
    inorder[v] -= 1;
    DP[v] = Math.max(DP[v], DP[u] + weights[v]);
    if (!inorder[v]) {
      deque.push(v);
    }
  }
}

console.log(Math.max(...DP));
```
