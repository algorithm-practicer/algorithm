# [[BOJ] 미세먼지 안녕!](https://www.acmicpc.net/problem/17144)

> [구현] [시뮬레이션]

## 발상

- 아무리 봐도 단순 구현

## <br>정답 코드

- 파이썬은 느리다..

```python
ROBOT = -1

import sys
readline = sys.stdin.readline

ny = [-1, 0, 1, 0]
nx = [0, -1, 0, 1]

R, C, T = map(int, readline().split())
graph = []
robots = []

for i in range(R):
    row = list(map(int, readline().split()))
    graph.append([])
    for j in range(C):
        graph[i].append(row[j])
        if graph[i][j] == ROBOT:
            robots.append((i, j))

for _ in range(T):
    spreads = [[0] * C for _ in range(R)]
    # step 1
    for i in range(R):
        for j in range(C):
            if graph[i][j] and not graph[i][j] == ROBOT:
                enable_spread = 0
                for k in range(4):
                    dy = i + ny[k]
                    dx = j + nx[k]
                    if 0 <= dy < R and 0 <= dx < C and not graph[dy][dx] == ROBOT:
                        enable_spread += 1

                spread_value = graph[i][j] // 5
                for k in range(4):
                    dy = i + ny[k]
                    dx = j + nx[k]
                    if 0 <= dy < R and 0 <= dx < C and not graph[dy][dx] == ROBOT:
                        spreads[dy][dx] += spread_value
                graph[i][j] -= (enable_spread * spread_value)
    for i in range(R):
        for j in range(C):
            graph[i][j] += spreads[i][j]

    moved = [[0] * C for _ in range(R)]
    moved[robots[0][0]][robots[0][1]] = ROBOT
    moved[robots[1][0]][robots[1][1]] = ROBOT
    # step 2
    first_y, first_x = robots[0]
    first_x += 1
    while first_x < C - 1:
        moved[first_y][first_x + 1] = graph[first_y][first_x]
        first_x += 1
    while first_y > 0:
        moved[first_y - 1][first_x] = graph[first_y][first_x]
        first_y -= 1
    while first_x > 0:
        moved[first_y][first_x - 1] = graph[first_y][first_x]
        first_x -= 1
    while first_y < robots[0][0] - 1:
        moved[first_y + 1][first_x] = graph[first_y][first_x]
        first_y += 1

    second_y, second_x = robots[1]
    second_x += 1
    while second_x < C - 1:
        moved[second_y][second_x + 1] = graph[second_y][second_x]
        second_x += 1
    while second_y < R - 1:
        moved[second_y + 1][second_x] = graph[second_y][second_x]
        second_y += 1
    while second_x > 0:
        moved[second_y][second_x - 1] = graph[second_y][second_x]
        second_x -= 1
    while second_y > robots[1][0] + 1:
        moved[second_y - 1][second_x] = graph[second_y][second_x]
        second_y -= 1

    for i in range(R):
        graph[i][0] = moved[i][0]
        graph[i][-1] = moved[i][-1]
    for i in range(C):
        graph[0][i] = moved[0][i]
        graph[robots[0][0]][i] = moved[robots[0][0]][i]
        graph[robots[1][0]][i] = moved[robots[1][0]][i]
        graph[-1][i] = moved[-1][i]

answer = 0
for i in range(R):
    for j in range(C):
        if not graph[i][j] == ROBOT:
            answer += graph[i][j]

print(answer)
```
