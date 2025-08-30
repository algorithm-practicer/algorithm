# [[BOJ] 서강그라운드](https://www.acmicpc.net/problem/14938)

> [그래프 이론] [최단 경로] [데이크스트라] [플로이드-워셜]

## 발상

- 시간복잡도를 계산해보니 다익스트라나 플로이드워셜 아무거나 써도 상관없겠구나

## <br>정답 코드

```python
import sys
import heapq
readline = sys.stdin.readline

n, m, r = map(int, readline().split())
t = [0, *list(map(int, readline().split()))]
graph = [[] for _ in range(n + 1)]

for _ in range(r):
    u, v, w = map(int, readline().split())
    graph[u].append((w, v))
    graph[v].append((w, u))

INF = float('inf')

answer = 0

for i in range(1, n):
    d = [INF] * (n + 1)
    pq = [(0, i)]
    d[i] = 0

    while pq:
        w, u = heapq.heappop(pq)
        if not w == d[u]:
            continue

        for nxt_w, v in graph[u]:
            if w + nxt_w > d[v]:
                continue
            d[v] = w + nxt_w
            heapq.heappush(pq, (w + nxt_w, v))

    temp = 0
    for j in range(1, n + 1):
        if d[j] <= m:
            temp += t[j]
    answer = max(answer, temp)

print(answer)
```
