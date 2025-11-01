# [[BOJ] Coins](https://www.acmicpc.net/problem/3067)

> [다이나믹 프로그래밍] [배낭 문제]

## 발상

- 물건을 무한대로 쓸 수 있는 배낭 문제.
- 무한대로 쓸 수 있을 때와는 다르게 오름차순으로 탐색하여 이전에 구한 값들을 이용하여 현재 값을 갱신

## <br>정답 코드

```js
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = Number(inputs[0]);
const LINES = 3;

for (let tc = 0; tc < T; tc++) {
  const start = tc * LINES + 1;
  const coins = inputs[start + 1].split(" ").map(Number);
  const goal = Number(inputs[start + 2]);

  const dp = Array(goal + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let s = coin; s <= goal; s++) {
      dp[s] += dp[s - coin];
    }
  }

  console.log(dp[goal]);
}
```
