# [[BOJ] 플로이드 2](https://www.acmicpc.net/problem/11780)

> [그래프 이론] [최단 경로] [플로이드-워셜]

## 발상

- 플로이드 알고리즘 + 경로 복원 방식

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

INF = float('inf')

n = int(readline())
m = int(readline())
d = [[INF] * (n + 1) for _ in range(n + 1)]
nxt = [[INF] * (n + 1) for _ in range(n + 1)]

for _ in range(m):
    a, b, c = map(int, readline().split())
    if c < d[a][b]:
        d[a][b] = c
        nxt[a][b] = b

for i in range(1, n + 1):
    d[i][i] = 0

for i in range(1, n + 1):
    for j in range(1, n + 1):
        for k in range(1, n + 1):
            if i == j or j == k or k == i:
                continue
            if d[j][k] > d[j][i] + d[i][k]:
                d[j][k] = d[j][i] + d[i][k]
                nxt[j][k] = nxt[j][i]

for i in range(1, n + 1):
    for j in range(1, n + 1):
        print(d[i][j], end=' ') if not d[i][j] == INF else print(0, end=' ')
    print()

for i in range(1, n + 1):
    for j in range(1, n + 1):
        if d[i][j] == 0 or d[i][j] == INF:
            print(0)
            continue
        track = [i]
        f = i
        while not nxt[f][j] == j:
            f = nxt[f][j]
            track.append(f)
        track.append(j)
        print(len(track), end = ' ')
        print(*track)



```
