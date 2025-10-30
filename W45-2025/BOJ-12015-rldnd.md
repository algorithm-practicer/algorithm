# [[BOJ] 가장 긴 증가하는 부분 수열 2](https://www.acmicpc.net/problem/12015)

> [이분 탐색] [가장 긴 증가하는 부분 수열 문제]

## 발상

- LIS 문제.
- 시간복잡도가 최대 O(NlogN)이므로 이분탐색 사용.

## <br>정답 코드

```js
// 요구 시간복잡도: O(NlogN)
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

let lis = [numbers[0]];

for (let i = 1; i < N; i++) {
  const value = numbers[i];
  if (lis[lis.length - 1] < value) {
    lis.push(value);
    continue;
  }
  const idx = lowerBound(lis, value);
  lis[idx] = value;
}

console.log(lis.length);
```
