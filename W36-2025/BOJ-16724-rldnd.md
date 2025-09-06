# [[BOJ] 피리 부는 사나이](https://www.acmicpc.net/problem/16724)

> [자료 구조] [그래프 이론] [그래프 탐색] [깊이 우선 탐색] [분리 집합] [격자 그래프]

## 발상

- dfs 사용.

## 틀린 풀이 코드 및 틀린 이유

- 시작점과 상관없이 예제를 통해 순환이 생겨도 괜찮다고 판단했다.
- 다른 예시를 들어보니 이미 순환이 끝난 곳으로 들어가게 된다면, 그것은 answer가 처리되지 않아야하는데 그게 고려되지 않음.

```python
import sys
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

directions = {
    'U': [-1, 0],
    'L': [0, -1],
    'D': [1, 0],
    'R': [0, 1]
}

N, M = map(int, readline().split())
visited = [[False] * M for _ in range(N)]
graph = [[] for _ in range(N)]

for i in range(N):
    graph[i] = list(readline().rstrip())

answer = 0

def dfs(i, j):
    global answer, graph

    if visited[i][j]:
        answer += 1
        return
    visited[i][j] = True
    next_row, next_col = i + directions[graph[i][j]][0], j + directions[graph[i][j]][1]
    dfs(next_row, next_col)

for i in range(N):
    for j in range(M):
        if visited[i][j]:
            continue
        dfs(i, j)

print(answer)
```

## <br>정답 코드

- 순환하는동안 방문한 노드들은 1로, 순환이 끝난 노드들은 2로 처리한다.

```python
import sys
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

directions = {
    'U': [-1, 0],
    'L': [0, -1],
    'D': [1, 0],
    'R': [0, 1]
}

N, M = map(int, readline().split())
visited = [[0] * M for _ in range(N)]
graph = [[] for _ in range(N)]

for i in range(N):
    graph[i] = list(readline().rstrip())

answer = 0

def dfs(i, j):
    global answer, graph, visited

    next_row, next_col = i + directions[graph[i][j]][0], j + directions[graph[i][j]][1]
    if visited[next_row][next_col] == 1:
        answer += 1
        visited[i][j] = 2
        return
    if visited[next_row][next_col] == 2:
        visited[i][j] = 2
        return

    visited[next_row][next_col] = 1
    dfs(next_row, next_col)
    visited[i][j] = 2

for i in range(N):
    for j in range(M):
        if visited[i][j]:
            continue
        visited[i][j] = 1
        dfs(i, j)

print(answer)
```
