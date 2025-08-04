# [[BOJ] 치즈](https://www.acmicpc.net/problem/2638)

> [구현] [그래프 이론] [그래프 탐색] [시뮬레이션] [너비 우선 탐색] [깊이 우선 탐색] [격자 그래프]

## 발상

- 1시간 후에 녹아없어지는 조건

  - 조건1: 2변 이상이 바깥과 접촉해야함.
  - 조건2: 치즈 내부 공간은 외부 공기와 접촉하지 않음

- 공기의 성격: 외부 / 내부 -> BFS 한번으로 체크 가능
- 치즈 C: 공기의 성격과 함께 BFS 한번으로 체크 가능
- BFS -> O(E + V) => O(50_000)
- 한번 처리 O(100_000)
- 100번 까지 상관이 없어서 해당 로직 while문으로 처리해도 상관 없음

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline
N, M = map(int, readline().split())

ny = [-1, 0, 1, 0]
nx = [0, -1, 0, 1]

AIR = 0
OUT_AIR = 100
CHEESE = 1
WILL_DELETE_CHEESE = 2
times = 0

cheese_count = 0

graph = []
for i in range(N):
    row = list(map(int, readline().split()))
    graph.append(row)
    for j in range(M):
        if row[j] == CHEESE:
            cheese_count += 1

while cheese_count:
    times += 1
    out_air_queue = deque([(0, 0)])
    visited = [([False] * M) for _ in range(N)]
    visited[0][0] = True
    graph[0][0] = OUT_AIR

    while out_air_queue:
        y, x = out_air_queue.popleft()
        for i in range(4):
            dy = y + ny[i]
            dx = x + nx[i]
            if 0 <= dy < N and 0 <= dx < M and not visited[dy][dx] and not graph[dy][dx] == CHEESE:
                out_air_queue.append((dy, dx))
                visited[dy][dx] = True
                graph[dy][dx] = OUT_AIR

    for i in range(N):
        for j in range(M):
            if graph[i][j] == CHEESE and not visited[i][j]:
                visited[i][j] = True
                cheese_queue = deque([(i, j)])

                while cheese_queue:
                    y, x = cheese_queue.popleft()

                    count = 0
                    if graph[y + 1][x] == OUT_AIR:
                        count += 1
                    if graph[y][x - 1] == OUT_AIR:
                        count += 1
                    if graph[y - 1][x] == OUT_AIR:
                        count += 1
                    if graph[y][x + 1] == OUT_AIR:
                        count += 1

                    if count >= 2:
                        graph[y][x] = WILL_DELETE_CHEESE
                        cheese_count -= 1

                    for k in range(4):
                        dy = y + ny[k]
                        dx = x + nx[k]
                        if 0 <= dy < N and 0 <= dx < M and not visited[dy][dx] and graph[dy][dx] == CHEESE:
                            cheese_queue.append((dy, dx))
                            visited[dy][dx] = True

print(times)
```
