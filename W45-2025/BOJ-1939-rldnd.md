# [[BOJ] 중량제한](https://www.acmicpc.net/problem/1939)

> [자료 구조] [그래프 이론] [그래프 탐색] [이분 탐색] [너비 우선 탐색] [최단 경로] [데이트스트라] [분리 집합]

> _위와 같이 만약 사용한 알고리즘 기술 및 자료구조가 있다면, 적어주세요._

## 발상

> _풀이를 떠오르게된 과정을 상세히 적어주시면 됩니다._

## <br> 틀린 풀이 코드 및 틀린 이유

- 아무생각없이 다음 넘어갈 때의 최대 중량을 해당 간선의 무게로 갱신해버렸다.

```js
/**
 * 2 <= N <= 10_000
 * dijkstra. 제일 큰 값.
 */
class Heap {
  constructor(comparator = (a, b) => a - b, data = []) {
    this.comparator = comparator;
    this.data = data;
    if (this.data.length > 0) {
      this.heapify();
    }
  }

  get length() {
    return this.data.length;
  }

  swap(i, j) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  getParent(i) {
    return (i - 1) >> 1;
  }

  getLeftChild(i) {
    return (i << 1) + 1;
  }

  getRightChild(i) {
    return (i << 1) + 2;
  }

  shiftUp(i) {
    while (i > 0) {
      const parent = this.getParent(i);
      if (this.comparator(this.data[i], this.data[parent]) < 0) {
        this.swap(i, parent);
        i = parent;
      } else break;
    }
  }

  shiftDown(i) {
    while (true) {
      const leftChild = this.getLeftChild(i);
      const rightChild = this.getRightChild(i);
      let best = i;

      if (
        leftChild < this.data.length &&
        this.comparator(this.data[leftChild], this.data[best]) < 0
      ) {
        best = leftChild;
      }

      if (
        rightChild < this.data.length &&
        this.comparator(this.data[rightChild], this.data[best]) < 0
      ) {
        best = rightChild;
      }

      if (i !== best) {
        this.swap(best, i);
        i = best;
      } else break;
    }
  }

  push(value) {
    this.data.push(value);
    this.shiftUp(this.data.length - 1);
  }

  pop() {
    if (!this.data.length) return;
    this.swap(0, this.data.length - 1);
    const result = this.data.pop();
    this.shiftDown(0);
    return result;
  }

  peek() {
    return this.data[0];
  }

  heapify() {
    for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
      this.shiftDown(i);
    }
  }
}

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = inputs[0].split(" ").map(Number);

const maxHeap = new Heap((a, b) => b[0] - a[0]);
const distances = Array(N + 1).fill(0);

const graph = Array(N + 1)
  .fill()
  .map(() => Array());

for (let i = 0; i < M; i++) {
  const [u, v, w] = inputs[i + 1].split(" ").map(Number);
  graph[u].push([w, v]);
  graph[v].push([w, u]);
}

const [start, end] = inputs.at(-1).split(" ").map(Number);

maxHeap.push([0, start]);

while (maxHeap.length > 0) {
  const [d, u] = maxHeap.pop();
  if (d !== distances[u]) continue;

  for (const [w, v] of graph[u]) {
    const nextDistance = w;
    if (nextDistance > distances[v]) {
      distances[v] = nextDistance;
      maxHeap.push([nextDistance, v]);
    }
  }
}

console.log(distances[end]);
```

## <br>정답 코드

- 다음 넘어갈 때의 최대 중량은, 현재까지 온 경로에서의 최소 중량과 해당 간선의 무게 중 더 작은 값

```js
/**
 * 2 <= N <= 10_000
 * dijkstra. 제일 큰 값.
 */
class Heap {
  constructor(comparator = (a, b) => a - b, data = []) {
    this.comparator = comparator;
    this.data = data;
    if (this.data.length > 0) {
      this.heapify();
    }
  }

  get length() {
    return this.data.length;
  }

  swap(i, j) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  getParent(i) {
    return (i - 1) >> 1;
  }

  getLeftChild(i) {
    return (i << 1) + 1;
  }

  getRightChild(i) {
    return (i << 1) + 2;
  }

  shiftUp(i) {
    while (i > 0) {
      const parent = this.getParent(i);
      if (this.comparator(this.data[i], this.data[parent]) < 0) {
        this.swap(i, parent);
        i = parent;
      } else break;
    }
  }

  shiftDown(i) {
    while (true) {
      const leftChild = this.getLeftChild(i);
      const rightChild = this.getRightChild(i);
      let best = i;

      if (
        leftChild < this.data.length &&
        this.comparator(this.data[leftChild], this.data[best]) < 0
      ) {
        best = leftChild;
      }

      if (
        rightChild < this.data.length &&
        this.comparator(this.data[rightChild], this.data[best]) < 0
      ) {
        best = rightChild;
      }

      if (i !== best) {
        this.swap(best, i);
        i = best;
      } else break;
    }
  }

  push(value) {
    this.data.push(value);
    this.shiftUp(this.data.length - 1);
  }

  pop() {
    if (!this.data.length) return;
    this.swap(0, this.data.length - 1);
    const result = this.data.pop();
    this.shiftDown(0);
    return result;
  }

  peek() {
    return this.data[0];
  }

  heapify() {
    for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
      this.shiftDown(i);
    }
  }
}

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = inputs[0].split(" ").map(Number);

const maxHeap = new Heap((a, b) => b[0] - a[0]);
const distances = Array(N + 1).fill(0);

const graph = Array(N + 1)
  .fill()
  .map(() => Array());

for (let i = 0; i < M; i++) {
  const [u, v, w] = inputs[i + 1].split(" ").map(Number);
  graph[u].push([w, v]);
  graph[v].push([w, u]);
}

const [start, end] = inputs.at(-1).split(" ").map(Number);

maxHeap.push([Infinity, start]);
distances[start] = Infinity;

while (maxHeap.length > 0) {
  const [d, u] = maxHeap.pop();
  if (d !== distances[u]) continue;

  for (const [w, v] of graph[u]) {
    const nextDistance = Math.min(w, d);
    if (nextDistance > distances[v]) {
      distances[v] = nextDistance;
      maxHeap.push([nextDistance, v]);
    }
  }
}

console.log(distances[end]);
```
