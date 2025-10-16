# [[BOJ] 평범한 배낭 2](https://www.acmicpc.net/problem/12920)

> [다이나믹 프로그래밍] [배낭 문제]

## 발상

- 냅색 문제

## <br> 틀린 풀이 코드 및 틀린 이유

- 시간 초과
- 냅색을 2차원 + 모든 아이템을 아이템개수만큼 계속 추가하는 방식으로 구현

```python
"""
N: 물건의 종류의 수
M: 가방의 최대 무게
"""

import sys
readline = sys.stdin.readline

N, M = map(int, readline().split())
counts = 0
# (무게, 만족도)
things = []

DP = []

for _ in range(N):
    V, C, K = map(int, readline().split())
    counts += K
    for _ in range(K):
        things.append((V, C))

for c in range(counts):
    DP.append([])
    for m in range(M + 1):
        DP[c].append(0)

for i in range(counts):
    for j in range(M + 1):
        DP[i][j] = DP[i - 1][j]
        # 만약 지금 보고 있는 물건보다 무게가 낮거나 같다면
        if things[i][0] <= j:
            DP[i][j] = max(DP[i][j], DP[i - 1][j - things[i][0]] + things[i][1])

print(DP[-1][-1])
```

## <br>정답 코드

- K를 2의 제곱수로 분해하여 아이템을 추가하는 방식으로 구현
- 냅색을 1차원 배열로 구현

```python

import sys
readline = sys.stdin.readline

N, M = map(int, readline().split())
DP = [0] * (M + 1)

items = []
for _ in range(N):
    V, C, K = map(int, readline().split())

    cnt = 1
    while K > 0:
        use = min(cnt, K)
        items.append((V * use, C * use))
        K -= use
        cnt *= 2

for weight, value in items:
    for i in range(M, weight - 1, -1):
        DP[i] = max(DP[i], DP[i - weight] + value)

print(DP[M])
```
