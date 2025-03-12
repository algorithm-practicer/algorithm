# [[BOJ] MooTube (Silver)](https://www.acmicpc.net/problem/15591)

> [그래프 이론] [그래프 탐색] [너비 우선 탐색] [깊이 우선 탐색]

## 발상

- 각 출발지에서 목적지에 대한 값을 미리 저장해놓기

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline

N, Q = map(int, readline().split())
graph = [[] for _ in range(N + 1)]
START_INF = 1e11
RESET_INF = 1e10
d = [[START_INF] * (N + 1)  for _ in range(N + 1)]

for _ in range(N - 1):
    p, q, r = map(int, readline().split())
    graph[p].append((q, r))
    graph[q].append((p, r))

def get_distance(start):
    global d
    if not d[start][start] == START_INF:
        return

    queue = deque([(start, RESET_INF)])
    d[start][start] = RESET_INF
    visited = [False] * (N + 1)
    visited[start] = True

    while queue:
        p, r = queue.popleft()
        for q, dis in graph[p]:
            if not visited[q]:
                d[start][q] = min(dis, d[start][p])
                visited[q] = True
                queue.append((q, dis))

for _ in range(Q):
    k, v = map(int, readline().split())
    get_distance(v)
    answer = 0

    for i in d[v]:
        if not i == START_INF and not i == RESET_INF and i >= k:
             answer += 1
    print(answer)
```
