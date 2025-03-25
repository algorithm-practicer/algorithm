# [[BOJ] 플로이드](https://www.acmicpc.net/problem/11404)

> [그래프 이론] [최단 경로] [플로이트-워셜]

## 발상

- 플로이드 알고리즘 연습

## <br>정답 코드

```python
"""
시간복잡도: O(N^4)
"""

import sys
readline = sys.stdin.readline

INF = float('inf')
n = int(readline())
m = int(readline())
d = [[INF] * (n + 1) for _ in range(n + 1)]

for _ in range(m):
    a, b, c = map(int, readline().split())
    if d[a][b] > c:
        d[a][b] = c

for i in range(1, n + 1):
    d[i][i] = 0

# i: 거치는 위치, j: 시작, k: 끝
for i in range(1, n + 1):
    for j in range(1, n + 1):
        for k in range(1, n + 1):
            if i == j or i == k or j == k:
                continue
            if d[j][k] > d[j][i] + d[i][k]:
                d[j][k] = d[j][i] + d[i][k]

for i in range(1, n + 1):
    for j in range(1, n + 1):
        print(d[i][j], end=' ') if not d[i][j] == INF else print(0, end=' ')
    print()
```
