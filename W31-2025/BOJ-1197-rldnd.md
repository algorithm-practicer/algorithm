# [[BOJ] 최소 스패닝 트리](https://www.acmicpc.net/problem/1197)

> [그래프 이론] [최소 스패닝 트리]

## 발상

- MST 구현을 해보자.

## <br>정답 코드 - 크루스칼 알고리즘

```python
import sys
sys.setrecursionlimit(10 ** 6)
readline = sys.stdin.readline

V, E = map(int, readline().split())
p = [-1] * (V + 1)
checked_edges = 0
top = 0
answer = 0

def find(value):
    if p[value] < 0:
        return value
    result = find(p[value])
    p[value] = result
    return result

def union(x, y):
    x = find(x)
    y = find(y)

    if x == y:
        return

    if p[x] > p[y]:
        x, y = y, x

    if p[x] == p[y]:
        p[x] -= 1

    p[y] = x

edges = [list(map(int, readline().split())) for _ in range(E)]
edges.sort(key = lambda x: x[2])

while checked_edges < V-1:
    u, v, w = edges[top]
    if not find(u) == find(v):
        union(u, v)
        checked_edges += 1
        answer += w
    top += 1

print(answer)
```

## <br>정답 코드 - 프림 알고리즘

```python
import sys
import heapq
readline = sys.stdin.readline

V, E = map(int, readline().split())
edges = [list(map(int, readline().split())) for _ in range(E)]
checked_edges = 0
answer = 0

mst = [False] * (V + 1)

graph = [[] for _ in range(V + 1)]
for u, v, w in edges:
    graph[u].append((w, v))
    graph[v].append((w, u))

pq = []
mst[1] = True
for w, u in graph[1]:
    heapq.heappush(pq, (w, 1, u))

while checked_edges < V - 1:
    w, u, v = heapq.heappop(pq)
    if mst[u] and mst[v]:
        continue
    mst[v] = True
    checked_edges += 1
    answer += w

    for weight, a in graph[v]:
        if not mst[a]:
            heapq.heappush(pq, (weight, v, a))

print(answer)
```
