# [[BOJ] 회전 초밥](https://www.acmicpc.net/problem/15961)

> [두 포인터] [슬라이딩 윈도우]

## 발상

- 슬라이딩 윈도우로 처리 가능해보임.

## <br>정답 코드

```js
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 2 ≤ N ≤ 3,000,000, 2 ≤ d ≤ 3,000, 2 ≤ k ≤ 3,000 (k ≤ N), 1 ≤ c ≤ d
/** N: 접시의 수, d: 초밥의 가짓 수, k: 연속해서 먹는 접시의 수, c: 쿠폰 번호 */

// 1. 슬라이딩윈도우
const [N, d, k, c] = inputs[0].split(" ").map(Number);
const dishes = inputs.slice(1).map(Number);
const dishesDiverse = new Map();
let dishesDiverseCount = 0;

dishesDiverse.set(c, 0);

for (let i = 0; i < k; i++) {
  if (dishesDiverse.has(dishes[i]) && !!dishesDiverse.get(dishes[i])) {
    dishesDiverse.set(dishes[i], dishesDiverse.get(dishes[i]) + 1);
  } else {
    dishesDiverseCount += 1;
    dishesDiverse.set(dishes[i], 1);
  }
}

let answer = !!dishesDiverse.get(c)
  ? dishesDiverseCount
  : dishesDiverseCount + 1;
let start = 0;
let end = k;

if (N === k) {
  console.log(dishesDiverseCount);
  return;
}

while (start < N) {
  const _start = start % N;
  const _end = end % N;
  dishesDiverse.set(dishes[_start], dishesDiverse.get(dishes[_start]) - 1);
  dishesDiverse.get();
  if (!dishesDiverse.get(dishes[_start])) dishesDiverseCount -= 1;
  dishesDiverse.set(dishes[_end], (dishesDiverse.get(dishes[_end]) ?? 0) + 1);
  if (dishesDiverse.get(dishes[_end]) === 1) dishesDiverseCount += 1;

  answer = Math.max(answer, dishesDiverseCount + !dishesDiverse.get(c));
  if (answer === d) break;
  start += 1;
  end += 1;
}

console.log(answer);
```
