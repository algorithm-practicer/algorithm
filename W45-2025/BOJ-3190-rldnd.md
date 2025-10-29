# [[BOJ] 뱀](https://www.acmicpc.net/problem/3190)

> [구현] [자료 구조] [시뮬레이션] [덱] [큐]

## 발상

- 제일 처리하기 애매했던 건, 뱀의 몸톰이 지금 어디어디에 위치하는 것.
- 해당 정보를 deque, graph 에 각각 관리.
  - deque에는 꼬리부터 몸통까지를 순서대로 저장. 사과를 먹지 않았을 시에 popFront
  - graph에는 뱀의 몸통이 위치한 곳을 true로 표시.
  - deque를 쓰지 않으면 어디가 꼬리인지 모를 수 있고, graph를 쓰지 않으면 움직일 때 마다 몸통 전체를 탐색해야 함.

## <br>정답 코드

```js
class Deque {
  constructor() {
    this.size = 0;
    this.tail = -1;
    this.head = 0;
    this.data = {};
  }

  get length() {
    return this.size;
  }

  push(value) {
    this.tail += 1;
    this.data[this.tail] = value;
    this.size += 1;
  }

  pop() {
    if (!this.size) return;
    this.size -= 1;
    const result = this.data[this.tail];
    delete this.data[this.tail];
    this.tail -= 1;
    return result;
  }

  peekFront() {
    if (!this.size) return;
    return this.data[this.head];
  }

  pushFront(value) {
    this.head -= 1;
    this.data[this.head] = value;
    this.size += 1;
  }

  popFront() {
    if (!this.size) return;
    this.size -= 1;
    const result = this.data[this.head];
    delete this.data[this.head];
    this.head += 1;
    return result;
  }

  *[Symbol.iterator]() {
    if (!this.size) return;
    for (let i = this.head; i <= this.tail; i++) {
      yield this.data[i];
    }
  }
}

const EMPTY = Symbol("EMPTY");
const APPLE = Symbol("APPLE");

const ny = [0, 1, 0, -1];
const nx = [1, 0, -1, 0];

// currentDirection - 1
const LEFT = "L";
let currentDirection = 0;

const fs = require("fs");
const queue = new Deque();
const tail = new Deque();
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(inputs[0]);
const K = Number(inputs[1]);
const apples = inputs.slice(2, 2 + K);
const L = Number(inputs[2 + K]);
const directions = inputs.slice(3 + K, 3 + K + L).map((value) => {
  const [time, direction] = value.split(" ");
  return [Number(time), direction];
});

const directionsObject = {};
for (let [time, direction] of directions) {
  directionsObject[time] = direction;
}

const graph = Array(N)
  .fill()
  .map(() => Array(N).fill(EMPTY));

const visited = Array(N)
  .fill()
  .map(() => Array(N).fill(false));

for (const apple of apples) {
  const [row, col] = apple.split(" ").map(Number);
  graph[row - 1][col - 1] = APPLE;
}

queue.push([0, 0]);
tail.push([0, 0]);
visited[0][0] = true;
let time = -1;

while (queue.length > 0) {
  const [row, col] = queue.popFront();
  time += 1;

  if (time in directionsObject) {
    const next = directionsObject[time] === LEFT ? -1 : 1;
    currentDirection =
      currentDirection + next < 0 ? 3 : (currentDirection + next) % 4;
  }

  const [nextRow, nextCol] = [
    row + ny[currentDirection],
    col + nx[currentDirection],
  ];

  if (
    nextRow < 0 ||
    nextRow >= N ||
    nextCol < 0 ||
    nextCol >= N ||
    visited[nextRow][nextCol]
  )
    break;
  queue.push([nextRow, nextCol]);
  tail.push([nextRow, nextCol]);
  visited[nextRow][nextCol] = true;
  if (graph[nextRow][nextCol] === APPLE) {
    graph[nextRow][nextCol] = EMPTY;
  } else {
    const lastTail = tail.popFront();
    visited[lastTail[0]][lastTail[1]] = false;
  }
}

console.log(time + 1);
```
