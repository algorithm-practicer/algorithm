# [[BOJ] 가장 긴 증가하는 부분 수열 5](https://www.acmicpc.net/problem/14003)

> [이분 탐색] [역추적] [가장 긴 증가하는 부분 수열 문제]

## 발상

- LIS + 역추적

## <br>정답 코드

```js
const lowerBound = (array, target) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

const fs = require("fs");
const [_n, _numbers] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(_n);
const numbers = _numbers.split(" ").map(Number);

const DP = Array(N).fill(1);
const lis = [numbers[0]];

for (let i = 1; i < N; i++) {
  const value = numbers[i];
  if (lis[lis.length - 1] < value) {
    lis.push(value);
    DP[i] = lis.length;
    continue;
  }
  const idx = lowerBound(lis, value);
  lis[idx] = value;
  DP[i] = idx + 1;
}

const answer = [];
let pointer = lis.length;

for (let i = N - 1; i >= 0; i--) {
  if (pointer === 0) break;
  if (DP[i] === pointer) {
    answer.push(numbers[i]);
    pointer -= 1;
  }
}

console.log(lis.length);
console.log(answer.reverse().join(" "));
```
