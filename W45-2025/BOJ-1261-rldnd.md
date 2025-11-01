# [[BOJ] 알고스팟](https://www.acmicpc.net/problem/1261)

> [그래프 이론] [그래프 탐색] [최단 경로] [데이크스트라] [격자 그래프] [0-1 너비 우선 탐색]

## 발상

- BFS를 사용하면 되겠다.

## <br>[Optional] 틀린 풀이 코드 및 틀린 이유

> _문제를 풀었으나 틀린 경우, 각 풀이마다의 코드 및 틀린 이유에 대해서 적어주세요._

```python
print("hello world")
```

## <br>정답 코드

- 가중치가 1인 경우 push. 가중치가 0인 경우 pushFront.

```js
class Deque {
  constructor() {
    this.head = 0;
    this.tail = -1;
    this.size = 0;
    this.data = {};
  }

  get length() {
    return this.size;
  }

  push(value) {
    this.tail += 1;
    this.data[this.tail] = value;
    this.size += 1;
    return this.length;
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
    return this.length;
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

const EMPTY = 0;
const WALL = 1;
const ny = [-1, 0, 1, 0];
const nx = [0, -1, 0, 1];

const INF = Infinity;

const fs = require("fs");
const [sizes, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [width, height] = sizes.split(" ").map(Number);
const graph = Array(height);
const visited = Array(height)
  .fill()
  .map(() => Array(width).fill(Infinity));

const deque = new Deque();
visited[0][0] = 0;
deque.push([0, 0]);

for (let y = 0; y < height; y++) {
  const line = inputs[y].split("").map(Number);
  graph[y] = line;
}

while (deque.length > 0) {
  const [y, x] = deque.popFront();

  if (y === height - 1 && x === width - 1) continue;

  for (let i = 0; i < 4; i++) {
    const dy = ny[i] + y;
    const dx = nx[i] + x;

    if (
      dy < 0 ||
      dy >= height ||
      dx < 0 ||
      dx >= width ||
      visited[dy][dx] <= visited[y][x] + graph[dy][dx]
    )
      continue;

    visited[dy][dx] = visited[y][x] + graph[dy][dx];

    if (graph[dy][dx] === EMPTY) {
      deque.pushFront([dy, dx]);
    } else {
      deque.push([dy, dx]);
    }
  }
}

console.log(visited[height - 1][width - 1]);
```
