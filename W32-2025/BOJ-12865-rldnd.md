# [[BOJ] 평범한 배낭](https://www.acmicpc.net/problem/12865)

> [다이나믹 프로그래밍] [배낭 문제]

## 발상

- DP를 다시 복습하는 겸 풀어보자.

## <br>[Optional] 틀린 풀이 코드 및 틀린 이유

- DP[i][j] = max(DP[i][j], DP[i]j - items[i][0]] + items[i][1])
  - 이 부분이 생각해보니 같은 아이템을 여러번 쓸 수 있다고 구현을 해버린 것.

```python
import sys
readline = sys.stdin.readline

N, K = map(int, readline().split())
items = []

for _ in range(N):
    W, V = map(int, readline().split())
    items.append((W, V))

DP = [[0] * (K + 1) for _ in range(N)]

for i in range(0, N):
    for j in range(1, K + 1):
        if i -1 >= 0:
            DP[i][j] = DP[i-1][j]

        if j >= items[i][0]:
            if i - 1 >= 0:
                DP[i][j] = max(DP[i][j], DP[i][j - items[i][0]] + items[i][1])
            else:
                DP[i][j] = items[i][1]

print(DP[-1][K])
```

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N, K = map(int, readline().split())
items = []

for _ in range(N):
    W, V = map(int, readline().split())
    items.append((W, V))

DP = [[0] * (K + 1) for _ in range(N)]

for i in range(0, N):
    for j in range(1, K + 1):
        if i -1 >= 0:
            DP[i][j] = DP[i-1][j]

        if j >= items[i][0]:
            if i - 1 >= 0:
                DP[i][j] = max(DP[i][j], DP[i - 1][j - items[i][0]] + items[i][1])
            else:
                DP[i][j] = items[i][1]

print(DP[-1][K])
```
