# [[Programmers] 디스크 컨트롤러](https://school.programmers.co.kr/learn/courses/30/lessons/42627)

## 발상

- heap 사용

## <br> 틀린 풀이 코드 및 틀린 이유

- MAX_TIMES가 1000으로 고정되어있어서 그 이후에 처리가 되지 않음.

```js
/**
 * 작업: 번호, 요청 시각, 소요 시간
 * 작업을 하고 있지 않고, 대기 큐가 비어있지 않다면 시작.
 * 우선순위는 작업의 소요시간이 짧은 것, 작업의 요청 시각이 빠른 것, 작업의 번호가 작은 것
 *
 *
 */

class Deque {
  constructor(data = []) {
    this.size = 0;
    this.head = 0;
    this.tail = -1;
    this.data = {};
    if (data.length > 0) {
      data.forEach(this.push.bind(this));
    }
  }

  peekFront() {
    if (!this.length) return;
    return this.data[this.head];
  }

  peek() {
    if (!this.length) return;
    return this.data[this.tail];
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

  get length() {
    return this.size;
  }

  *[Symbol.iterator]() {
    if (!this.length) return;
    for (let i = this.head; i <= this.tail; i++) {
      yield this.data[i];
    }
  }
}

class Heap {
  constructor(comparator = (a, b) => a - b, data = []) {
    this.comparator = comparator;
    this.data = data;
    if (data.length > 0) {
      this.heapify();
    }
  }

  get length() {
    return this.data.length;
  }

  swap(a, b) {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  push(value) {
    this.data.push(value);
    this.siftUp(this.length - 1);
    return this.length;
  }

  pop() {
    if (this.length == 0) return;
    this.swap(0, this.length - 1);
    const result = this.data.pop();
    this.siftDown(0);
    return result;
  }

  siftUp(i) {
    while (i > 0) {
      const parent = this.getParent(i);
      if (this.comparator(this.data[i], this.data[parent]) < 0) {
        this.swap(i, parent);
        i = parent;
      } else break;
    }
  }

  siftDown(i) {
    while (true) {
      const leftChild = this.getLeftChild(i);
      const rightChild = this.getRightChild(i);
      let best = i;

      if (
        leftChild < this.length &&
        this.comparator(this.data[leftChild], this.data[best]) < 0
      ) {
        best = leftChild;
      }
      if (
        rightChild < this.length &&
        this.comparator(this.data[rightChild], this.data[best]) < 0
      ) {
        best = rightChild;
      }

      if (i !== best) {
        this.swap(i, best);
        i = best;
      } else break;
    }
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

  heapify() {
    for (let i = (this.length >> 1) - 1; i >= 0; i -= 1) {
      this.shiftDown(i);
    }
  }
}

const MAX_TIMES = 1000;

// HEAP에 넣는 기준: [요청시점, 지속시간, 번호]
// 우선순위: 1. 지속시간 짧음 2. 요청시점 빠름 3. 번호가 작음
function solution(jobs) {
  const comparator = (a, b) => {
    return a[1] - b[1] || a[0] - b[0] || a[2] - b[2];
  };

  const mappedJob = jobs.map((value, idx) => [value[0], value[1], idx]);
  const sortedJob = mappedJob.sort((a, b) => a[0] - b[0]);
  const jobDeque = new Deque(mappedJob);
  const minHeap = new Heap(comparator);

  let enableStartTime = 0;
  let answer = 0;

  for (let i = 0; i <= MAX_TIMES; i++) {
    if (!jobDeque.length && !minHeap.length) break;
    while (!!jobDeque.peekFront() && jobDeque.peekFront()[0] <= i) {
      const [startTime, duration, idx] = jobDeque.popFront();
      minHeap.push([startTime, duration, idx, i]);
    }

    if (!minHeap.length || enableStartTime > i) continue;
    const item = minHeap.pop();
    enableStartTime = i + item[1];
    answer += i + item[1] - item[0];
  }

  return Math.floor(answer / jobs.length);
}
```

## <br>정답 코드

```js
class Deque {
  constructor(data = []) {
    this.size = 0;
    this.head = 0;
    this.tail = -1;
    this.data = {};
    if (data.length > 0) {
      data.forEach(this.push.bind(this));
    }
  }

  peekFront() {
    if (!this.length) return;
    return this.data[this.head];
  }

  peek() {
    if (!this.length) return;
    return this.data[this.tail];
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

  get length() {
    return this.size;
  }

  *[Symbol.iterator]() {
    if (!this.length) return;
    for (let i = this.head; i <= this.tail; i++) {
      yield this.data[i];
    }
  }
}

class Heap {
  constructor(comparator = (a, b) => a - b, data = []) {
    this.comparator = comparator;
    this.data = data;
    if (data.length > 0) {
      this.heapify();
    }
  }

  get length() {
    return this.data.length;
  }

  swap(a, b) {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  push(value) {
    this.data.push(value);
    this.siftUp(this.length - 1);
    return this.length;
  }

  pop() {
    if (this.length == 0) return;
    this.swap(0, this.length - 1);
    const result = this.data.pop();
    this.siftDown(0);
    return result;
  }

  siftUp(i) {
    while (i > 0) {
      const parent = this.getParent(i);
      if (this.comparator(this.data[i], this.data[parent]) < 0) {
        this.swap(i, parent);
        i = parent;
      } else break;
    }
  }

  siftDown(i) {
    while (true) {
      const leftChild = this.getLeftChild(i);
      const rightChild = this.getRightChild(i);
      let best = i;

      if (
        leftChild < this.length &&
        this.comparator(this.data[leftChild], this.data[best]) < 0
      ) {
        best = leftChild;
      }
      if (
        rightChild < this.length &&
        this.comparator(this.data[rightChild], this.data[best]) < 0
      ) {
        best = rightChild;
      }

      if (i !== best) {
        this.swap(i, best);
        i = best;
      } else break;
    }
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

  heapify() {
    for (let i = (this.length >> 1) - 1; i >= 0; i -= 1) {
      this.shiftDown(i);
    }
  }
}

// HEAP에 넣는 기준: [요청시점, 지속시간, 번호]
// 우선순위: 1. 지속시간 짧음 2. 요청시점 빠름 3. 번호가 작음
function solution(jobs) {
  const comparator = (a, b) => {
    return a[1] - b[1] || a[0] - b[0] || a[2] - b[2];
  };

  jobs.sort((a, b) => a[0] - b[0]);
  const jobDeque = new Deque(jobs);
  const minHeap = new Heap(comparator);

  let enableStartTime = 0;
  let answer = 0;
  let i = 0;

  while (jobDeque.length || minHeap.length) {
    if (!minHeap.length && jobDeque.length && i < jobDeque.peekFront()[0]) {
      i = jobDeque.peekFront()[0];
    }

    while (jobDeque.peekFront() && jobDeque.peekFront()[0] <= i) {
      const [startTime, duration, idx] = jobDeque.popFront();
      minHeap.push([startTime, duration, idx]);
    }

    if (!minHeap.length) continue;

    const [start, duration] = minHeap.pop();

    i += duration;
    answer += i - start;
  }

  return Math.floor(answer / jobs.length);
}
```
