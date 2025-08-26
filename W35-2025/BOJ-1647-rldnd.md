# [[BOJ] 도시 분할 계획](https://www.acmicpc.net/problem/1647)

> [그래프 이론] [최소 스패닝 트리]

## 발상

- 결국 두 집 사이에 경로가 항상 존재. 유지비의 합 최소 -> MST 사용
- 두 구역으로 나눈다 -> MST 사용 후, 제일 가중치 높은 하나의 간선 제거

## <br>정답 코드 - 크루스칼

- 시간복잡도: O(E log E) -> 딱 조건에 맞는 수준

```python
import sys
readline = sys.stdin.readline

V, E = map(int, readline().split())
p = [-1] * (V + 1)

edges = []
for _ in range(E):
    u, v, w = map(int, readline().split())
    edges.append((w, u, v))

edges.sort(key = lambda x: x)
answers = []

def find(a):
    if p[a] < 0:
        return a
    result = find(p[a])
    p[a] = result
    return result

def union(a, b):
    a = find(a)
    b = find(b)

    if a == b:
        return

    if p[a] > p[b]:
        a, b = b, a

    if p[a] == p[b]:
        p[a] -= 1

    p[b] = a

for e in edges:
    w, u, v = e
    if find(u) == find(v):
        continue
    union(u, v)
    answers.append(w)

answers.sort(key = lambda x: x)
print(sum(answers[:-1]))
```

## <br>정답 코드 - 프림

```python
import sys
import heapq
readline = sys.stdin.readline

V, E = map(int, readline().split())
p = [-1] * (V + 1)

graph = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, readline().split())
    graph[u].append((w, v))
    graph[v].append((w, u))

mst = [False] * (V + 1)
mst[1] = True
pq = []
answer = []
checked_edges = 0

for w, v in graph[1]:
    heapq.heappush(pq,(w, 1, v))

while checked_edges < V - 1:
    w, u, v = heapq.heappop(pq)
    if mst[u] and mst[v]:
        continue
    answer.append(w)
    checked_edges += 1
    mst[v] = True

    for nxt_w, nxt_v in graph[v]:
        if not mst[nxt_v]:
            heapq.heappush(pq, (nxt_w, v, nxt_v))

answer.sort(key = lambda x: x)
print(sum(answer[:-1]))
```
