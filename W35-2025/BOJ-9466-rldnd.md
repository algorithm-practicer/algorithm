# [[BOJ] 텀 프로젝트](https://www.acmicpc.net/problem/9466)

> [그래프 이론] [그래프 탐색] [깊이 우선 탐색]

## <br> 틀린 풀이 코드 및 틀린 이유

- 비순환 그래프인 경우, union-find를 사용하여 사이클이 존재하는 것은 찾을 수 있으나, 순환 그래프인 경우에는 사이클을 찾지 못한다.

```python
import sys
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

T = int(readline())

def find(p, a):
    if p[a] < 0:
        return a
    result = find(p, p[a])
    p[a] = result
    return result

def union(p, a, b):
    if a == b:
        return a

    a = find(p, a)
    b = find(p, b)

    if a == b:
        return a

    if p[b] < p[a]:
        a, b = b, a

    if p[a] == p[b]:
        p[a] -= 1

    p[b] = a
    return None


for _ in range(T):
    V = int(readline())
    p = [-1] * (V + 1)
    E = [0, *list(map(int, readline().split()))]

    answer = []
    answer_count = 0

    for i in range(1, V + 1):
        result = union(p, i, E[i])
        if result:
            answer.append(result)

    for i in answer:
        answer_count += 1
        if p[i] < 0:
            for j in p[1:]:
                if j == i:
                    answer_count += 1

    print(V - answer_count)
```

## <br>정답 코드

- dfs 사용

```python
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline
T = int(readline())

def dfs(point):
    if not visited[E[point]]:
        visited[E[point]] = True
        route.append(E[point])
        dfs(E[point])
    else:
        route.append(E[point])

for _ in range(T):
    N = int(readline())
    E = [0, *list(map(int, readline().split()))]
    visited = [False] * (N + 1)
    answer = 0

    for i in range(1, N + 1):
        if not visited[i]:
            route = [i]
            visited[i] = True
            dfs(i)
            _dict = dict()

            for j in range(len(route)):
                if not route[j] in _dict:
                    _dict[route[j]] = j
                else:
                    answer += (j - _dict[route[j]])
                    break

    print(N - answer)
```
