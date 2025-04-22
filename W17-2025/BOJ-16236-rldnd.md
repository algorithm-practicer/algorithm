# [[BOJ] 아기 상어](https://www.acmicpc.net/problem/16236)

> [BFS] [백트래킹]

> _위와 같이 만약 사용한 알고리즘 기술 및 자료구조가 있다면, 적어주세요._

## 발상

- 아기상어가 움직일 때마다 dfs를 반복해서 진행해야 하겠구나

## <br>[Optional] 틀린 풀이 코드 및 틀린 이유

- 상어가 움직이고 나서 해당 위치를 0으로 초기화하지 않음.
- 물고기를 먹고나서 해당 위치를 초기화하지 않음
- 거리가 가까운 물고기가 많은 상태에서, 상어 시작점을 초기화할 때 초기 거리를 0으로 초기화하지 않음.

```python
import sys
import heapq
from collections import deque
readline = sys.stdin.readline

sys.setrecursionlimit(10**7)

"""
시간복잡도: O(2^N)

처음 아기상어 크기 2
아기상어는 1초에 상하좌우로 인접한 한 칸씩 이동

- 더 이상 먹을 수 있는 물고기가 공간에 없다면 아기 상어는 엄마 상어에게 도움을 요청한다. => 종료 조건
- 먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
- 먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다.
    - 거리는 아기 상어가 있는 칸에서 물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
    - 거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.
"""

N = int(readline())
EMPTY, SHARK = 0, 9

graph = []
start = None
size = 2
eat_count = 0
answer = 0
INF = float('inf')

ny = [-1,0,1,0]
nx = [0,-1,0,1]

for i in range(N):
    row = list(map(int, readline().split()))
    graph.append([])

    for j in range(N):
        graph[i].append(row[j])
        if graph[i][j] == SHARK:
            start = [0, i, j]

def add_eat_count():
    global size, eat_count
    eat_count += 1

    if size == eat_count:
        eat_count = 0
        size += 1

def dfs():
    global start, graph, size, eat_count, answer
    queue = deque()
    queue.append(start)
    enabled = []
    visited = [[INF] * N for _ in range(N)]
    visited[start[1]][start[2]] = 0

    while queue:
        d, row, col = queue.popleft()

        for i in range(4):
            dy = row + ny[i]
            dx = col + nx[i]
            if 0 <= dy < N and 0 <= dx < N and visited[dy][dx] > d + 1 and (graph[dy][dx] == EMPTY or graph[dy][dx] < size):
                if not graph[dy][dx] == EMPTY and graph[dy][dx] < size:
                    heapq.heappush(enabled, (d + 1, dy, dx))
                visited[dy][dx] = d + 1
                queue.append((d + 1, dy, dx))

    if not enabled:
        print(answer)
        exit()

    if len(enabled) == 1:
        d, row, col = enabled.pop()
        start = [0, row, col]
        answer += d
        add_eat_count()
        dfs()
    else:
        min_d = [INF, -1, -1]

        for d, row, col in enabled:
            if min_d[0] > d:
                min_d = [d, row, col]
            elif min_d[0] == d and min_d[1] > row:
                min_d = [d, row, col]
            elif min_d[0] == d and min_d[1] == row and min_d[2] > col:
                min_d = [d, row, col]
        start = min_d
        answer += min_d[0]
        add_eat_count()
        dfs()

dfs()


```

## <br>정답 코드

```python
import sys
import heapq
from collections import deque
readline = sys.stdin.readline

sys.setrecursionlimit(10**7)

"""
시간복잡도: O(2^N)

처음 아기상어 크기 2
아기상어는 1초에 상하좌우로 인접한 한 칸씩 이동

- 더 이상 먹을 수 있는 물고기가 공간에 없다면 아기 상어는 엄마 상어에게 도움을 요청한다. => 종료 조건
- 먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
- 먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다.
    - 거리는 아기 상어가 있는 칸에서 물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
    - 거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.
"""

N = int(readline())
EMPTY, SHARK = 0, 9

graph = []
start = None
size = 2
eat_count = 0
answer = 0
INF = float('inf')

ny = [-1,0,1,0]
nx = [0,-1,0,1]

for i in range(N):
    row = list(map(int, readline().split()))
    graph.append([])

    for j in range(N):
        graph[i].append(row[j])
        if graph[i][j] == SHARK:
            start = [0, i, j]

def add_eat_count():
    global size, eat_count
    eat_count += 1

    if size == eat_count:
        eat_count = 0
        size += 1

def bfs():
    global start, graph, size, eat_count, answer
    queue = deque()
    queue.append(start)
    enabled = []
    visited = [[INF] * N for _ in range(N)]
    visited[start[1]][start[2]] = 0

    while queue:
        d, row, col = queue.popleft()

        for i in range(4):
            dy = row + ny[i]
            dx = col + nx[i]
            if 0 <= dy < N and 0 <= dx < N and visited[dy][dx] > d + 1 and (graph[dy][dx] == EMPTY or graph[dy][dx] <= size):
                if not graph[dy][dx] == EMPTY and graph[dy][dx] < size:
                    heapq.heappush(enabled, (d + 1, dy, dx))
                visited[dy][dx] = d + 1
                queue.append((d + 1, dy, dx))

    if not enabled:
        print(answer)
        exit()

    if len(enabled) == 1:
        d, row, col = enabled.pop()
        graph[start[1]][start[2]] = EMPTY
        start = [0, row, col]
        answer += d
        graph[row][col] = SHARK

        add_eat_count()
        bfs()
    else:
        min_d = [INF, -1, -1]

        for d, row, col in enabled:
            if min_d[0] > d:
                min_d = [d, row, col]
            elif min_d[0] == d and min_d[1] > row:
                min_d = [d, row, col]
            elif min_d[0] == d and min_d[1] == row and min_d[2] > col:
                min_d = [d, row, col]
        graph[start[1]][start[2]] = EMPTY
        start = [0, min_d[1], min_d[2]]
        graph[start[1]][start[2]] = SHARK
        answer += min_d[0]
        add_eat_count()
        bfs()

bfs()


```
