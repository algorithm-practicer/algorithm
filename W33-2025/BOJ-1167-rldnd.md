# [[BOJ] 트리의 지름](https://www.acmicpc.net/problem/1167)

> [그래프 이론] [그래프 탐색] [트리] [깊이 우선 탐색] [트리의 지름]

## 발상

- DFS + DP를 사용하면 되겠구나

## <br> 틀린 풀이 코드 및 틀린 이유

- 이진 트리라는 가정이 없는데, DP[i][0]을 무조건 이진트리라는 가정 하에 만들어버림

```python
import sys
from collections import deque
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

V = int(readline())
DP = [[0, 0] for _ in range(V + 1)]
E = [[] for _ in range(V + 1)]
visited = [False] * (V + 1)

for _ in range(1, V + 1):
    row = deque(list(map(int, readline().split())))
    v = row.popleft()
    while len(row) > 1:
        u = row.popleft()
        w = row.popleft()
        E[v].append((w, u))

def dfs(start):
    for w, v in E[start]:
        if not visited[v]:
            visited[v] = True
            dfs(v)
            DP[start][0] += w
            DP[start][0] += DP[v][1]
            DP[start][1] = max(DP[v][1] + w, DP[start][1])

visited[1] = True
dfs(1)

answer = 0
for a, b in DP:
    answer = max(a, b, answer)
print(answer)
```

## <br>정답 코드

- 이진트리가 아니라는 점을 고려해서, DFS를 통해 각 노드의 자식 노드들로부터의 최대 거리를 계산하고, 이를 바탕으로 자식 노드의 개수에 따라 로직을 분기

```python
import sys
from collections import deque
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

V = int(readline())
E = [[] for _ in range(V + 1)]
visited = [False] * (V + 1)

for _ in range(1, V + 1):
    row = deque(list(map(int, readline().split())))
    v = row.popleft()
    while len(row) > 1:
        u = row.popleft()
        w = row.popleft()
        E[v].append((w, u))

answer = 0

def dfs(start):
    global answer
    visited[start] = True

    child_distances = []

    for w, v in E[start]:
        if not visited[v]:
            child_dist = dfs(v) + w
            child_distances.append(child_dist)

    max_dist = max(child_distances) if child_distances else 0

    if len(child_distances) >= 2:
        child_distances.sort(reverse=True)
        diameter_candidate = child_distances[0] + child_distances[1]
        answer = max(answer, diameter_candidate)
    elif len(child_distances) == 1:
        answer = max(answer, child_distances[0])

    return max_dist

dfs(1)
print(answer)
```
