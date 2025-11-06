# [[Programmers] 합승 택시 요금](https://school.programmers.co.kr/learn/courses/30/lessons/72413)

## 발상

- 처음에는 다익스트라로 푸는 문제구나 싶었음. (s -> a, s -> b, a -> b)만 구하면 되겠다 싶었음.
- 그런데, a와 b가 같은 경로를 타고 가다가 중간에 갈라질 수도 있다는 조건을 보고, 결국 floyd warshall 사용

## <br>정답 코드

```js
// floyd warshall
function solution(n, s, a, b, fares) {
  const d = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(Infinity));

  for (const [u, v, weight] of fares) {
    d[u][v] = Math.min(weight, d[u][v]);
    d[v][u] = Math.min(weight, d[v][u]);
  }

  for (let i = 1; i < n + 1; i++) {
    d[i][i] = 0;
  }

  // i: 시작 / j: 도착 / k: 경유지
  for (let k = 1; k < n + 1; k++) {
    for (let i = 1; i < n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
      }
    }
  }

  let answer = d[s][b] + d[s][a];

  for (let k = 1; k < n + 1; k++) {
    answer = Math.min(answer, d[s][k] + d[k][a] + d[k][b]);
  }

  return answer;
}
```
