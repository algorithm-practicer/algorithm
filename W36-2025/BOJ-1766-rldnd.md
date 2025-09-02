# [[BOJ] 문제집](https://www.acmicpc.net/problem/1766)

> [자료 구조] [그래프 이론] [우선순위 큐] [방향 비순환 그래프] [위상 정렬]

## 발상

- 위상 정렬 + 우선순위 큐

## <br>정답 코드

```python
import sys
import heapq
readline = sys.stdin.readline

N, M = map(int, readline().split())
indegree = [0] * (N + 1)
E = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, readline().split())
    E[u].append(v)
    indegree[v] += 1

queue = []
for i in range(1, N + 1):
    if not indegree[i]:
        heapq.heappush(queue, i)

answer = []

while queue:
    u = heapq.heappop(queue)
    answer.append(u)
    for v in E[u]:
        indegree[v] -= 1
        if not indegree[v]:
            heapq.heappush(queue, v)

print(*answer, sep = ' ')
```
