# [[BOJ] 연구소](https://www.acmicpc.net/problem/14502)

> [구현] [그래프 이론] [브루트포스 알고리즘] [그래프 탐색] [너비 우선 탐색] [격자 그래프]

## 발상

- 뭔가 시간복잡도가 엄청 높은거같은데, 다른 방법이 없어보이니 백트래킹 + BFS

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline
N, M = map(int, readline().split())
graph = [list(map(int, readline().split())) for _ in range(N)]
EMPTY, WALL, VIRUS = 0, 1, 2
base_starts = deque()
empty_queue = []
empty_count = 0
answer = 1e9

ny = [-1, 0, 1, 0]
nx = [0, -1, 0, 1]

for i in range(N):
    for j in range(M):
        if graph[i][j] == EMPTY:
            empty_queue.append((i, j))
            empty_count += 1
        if graph[i][j] == VIRUS:
            base_starts.append((i, j))

def bfs():
    global answer
    visited = [[False] * M for _ in range(N)]
    temp = 0
    starts = deque(base_starts)
    for i, j in starts:
        visited[i][j] = True

    while starts:
        y, x = starts.popleft()
        for i in range(4):
            dy = y + ny[i]
            dx = x + nx[i]

            if 0 <= dy < N and 0 <= dx < M and graph[dy][dx] == EMPTY and not visited[dy][dx]:
                visited[dy][dx] = True
                starts.append((dy, dx))
                temp += 1
    answer = min(answer, temp)

for i in range(len(empty_queue) - 2):
    graph[empty_queue[i][0]][empty_queue[i][1]] = WALL
    for j in range(i + 1, len(empty_queue) - 1):
        graph[empty_queue[j][0]][empty_queue[j][1]] = WALL
        for k in range(j + 1, len(empty_queue)):
            graph[empty_queue[k][0]][empty_queue[k][1]] = WALL
            bfs()
            graph[empty_queue[k][0]][empty_queue[k][1]] = EMPTY
        graph[empty_queue[j][0]][empty_queue[j][1]] = EMPTY
    graph[empty_queue[i][0]][empty_queue[i][1]] = EMPTY

print(empty_count - answer - 3)
```
