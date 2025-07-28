# [[BOJ] 소셜 네트워킹 어플리케이션](https://www.acmicpc.net/problem/7511)

> [자료 구조] [그래프 이론] [분리 집합] [Union-Find]

## 발상

- Union-Find를 사용하면 된다.
- 시간복잡도를 따져봤을 때, BFS도 사용은 가능하다.
- BFS의 경우, 처음 순회 시작점으로 부터 모든 순회된 노드들에 시작점을 채워놓으면 됨

## <br>정답 코드 - Union-Find

```python
import sys
readline = sys.stdin.readline

T = int(readline())

def find(p, a):
    if p[a] < 0:
        return a
    value = find(p, p[a])
    p[a] = value
    return value

def union(p, a, b):
    a = find(p, a)
    b = find(p, b)

    if a == b:
        return

    if a > b:
        a, b = b, a
    if a == b:
        p[a] -= 1
    p[b] = a


for t in range(T):
    print(f'Scenario {t + 1}:')
    V = int(readline())
    E = int(readline())
    p = [-1] * V
    for _ in range(E):
        a, b = map(int, readline().split())
        union(p, a, b)
    m = int(readline())
    for _ in range(m):
        a, b = map(int, readline().split())
        print(1) if find(p, a) == find(p, b) else print(0)
    print()
```

## <br>정답 코드 - BFS

```python
import sys
from collections import deque
readline = sys.stdin.readline

T = int(readline())

for t in range(T):
    print(f'Scenario {t + 1}:')
    V = int(readline())
    E = int(readline())

    graph = [[] for _ in range(V)]
    for _ in range(E):
        a, b = map(int, readline().split())
        graph[a].append(b)
        graph[b].append(a)

    visited = [-1] * V
    root = 0

    for i in range(V):
        if visited[i] == -1:

            queue = deque([i])
            visited[i] = root

            while queue:
                node = queue.popleft()
                for neighbor in graph[node]:
                    if visited[neighbor] == -1:
                        visited[neighbor] = root
                        queue.append(neighbor)

            root += 1


    m = int(readline())
    for _ in range(m):
        a, b = map(int, readline().split())

        print(1 if visited[a] == visited[b] else 0)
    print()
```
