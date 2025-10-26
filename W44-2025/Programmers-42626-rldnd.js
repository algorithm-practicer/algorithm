class Heap {
  constructor(comparator = (a, b) => a - b, data = []) {
    this.comparator = comparator;
    this.data = data;
  }

  peek() {
    return this.data[0];
  }

  size() {
    return this.data.length;
  }

  push(value) {
    this.data.push(value);
    this.siftUp(this.size() - 1);
  }

  pop() {
    if (!this.size()) return;
    this.swap(0, this.size() - 1);
    const result = this.data.pop();
    if (this.size()) this.siftDown(0);
    return result;
  }

  parent(i) {
    return (i - 1) >> 1;
  }

  left(i) {
    return (i << 1) + 1;
  }

  right(i) {
    return (i << 1) + 2;
  }

  swap(i, j) {
    const tempValue = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tempValue;
  }

  siftUp(i) {
    while (i > 0) {
      const parent = this.parent(i);
      if (this.comparator(this.data[i], this.data[parent]) < 0) {
        this.swap(i, parent);
        i = parent;
      } else break;
    }
  }

  siftDown(i) {
    while (true) {
      const leftChild = this.left(i);
      const rightChild = this.right(i);
      let best = i;

      if (
        leftChild < this.size() &&
        this.comparator(this.data[leftChild], this.data[best]) < 0
      ) {
        best = leftChild;
      }
      if (
        rightChild < this.size() &&
        this.comparator(this.data[rightChild], this.data[best]) < 0
      ) {
        best = rightChild;
      }

      if (best !== i) {
        this.swap(best, i);
        i = best;
      } else break;
    }
  }

  heapify() {
    for (let i = (this.size() >> 1) - 1; i >= 0; i -= 1) {
      this.siftDown(i);
    }
  }
}

function solution(scoville, K) {
  const minHeap = new Heap((a, b) => a - b, scoville);
  minHeap.heapify();
  let answer = 0;

  while (minHeap.size() >= 2 && minHeap.peek() < K) {
    const first = minHeap.pop();
    const second = minHeap.pop();
    minHeap.push(first + second * 2);
    answer += 1;
  }

  if (minHeap.peek() < K) {
    return -1;
  } else {
    return answer;
  }
}
