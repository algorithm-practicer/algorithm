# [[BOJ] 소수의 연속합](https://www.acmicpc.net/problem/1644)

> [수학] [정수론] [두 포인터] [소수 판정] [에라토스테네스의 체]

## 발상

- 에라토스테네스의 체를 사용해서 소수 리스트 구하기 시작복잡도 O(N log log N)
- 투 포인터로 연속된 소수의 합이 N이 되는 경우 찾기

## <br>정답 코드

```js
const fs = require("fs");
const N = Number(fs.readFileSync("/dev/stdin").toString());

const primeNumbersArray = Array(N + 1).fill(true);
const primeNumbers = [];

for (let i = 2; i * i <= N; i++) {
  for (let j = i * i; j <= N; j += i) {
    primeNumbersArray[j] = false;
  }
}

for (let i = 2; i <= N; i++) {
  if (primeNumbersArray[i]) primeNumbers.push(i);
}

let left = 0;
let right = 0;
let summation = primeNumbers[0];
let answer = 0;

while (
  left <= right &&
  left < primeNumbers.length &&
  right < primeNumbers.length
) {
  if (N > summation) {
    right += 1;
    if (right === primeNumbers.length) break;
    summation += primeNumbers[right];
    continue;
  }

  if (N < summation) {
    summation -= primeNumbers[left];
    left += 1;
    continue;
  }

  if (N === summation) {
    summation -= primeNumbers[left];
    left += 1;
    right += 1;
    summation += primeNumbers[right];
    answer += 1;
    continue;
  }
}

console.log(answer);
```
