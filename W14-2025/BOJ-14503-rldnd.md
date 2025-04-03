# [[BOJ] 로봇 청소기](https://www.acmicpc.net/problem/14503)

> [구현] [시뮬레이션]

## 발상

- 뭐 방법 쓸거 없이 구현이구나..

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N, M = map(int, readline().split())

NORTH, EAST, SOUTH, WEST = 0, 1, 2, 3

NORTH_BACK = [1, 0]
NORTH_FOR = [-1, 0]
EAST_BACK = [0, -1]
EAST_FOR = [0, 1]
SOUTH_BACK = NORTH_FOR
SOUTH_FOR = NORTH_BACK
WEST_BACK = EAST_FOR
WEST_FOR = EAST_BACK

DIRTY, WALL, CLEAN = 0, 1, 2

robot_state = list(map(int, readline().split()))
*robot, dir = robot_state

graph = [list(map(int, readline().split())) for _ in range(N)]

answer = 0

nx = [-1, 0, 1, 0]
ny = [0, -1, 0, 1]

while True:
    if graph[robot[0]][robot[1]] == DIRTY:
        answer += 1
        graph[robot[0]][robot[1]] = CLEAN

    checked = 0

    for i in range(4):
        dy = robot[0] + ny[i]
        dx = robot[1] + nx[i]
        if 0 <= dy < N and 0 <= dx < M and graph[dy][dx] == DIRTY:
            if dir == NORTH:
                dir = WEST
                if 0 <= robot[0] + WEST_FOR[0] < N and 0 <= robot[1] + WEST_FOR[1] < M and graph[robot[0] + WEST_FOR[0]][robot[1] + WEST_FOR[1]] == DIRTY:
                    robot = [robot[0] + WEST_FOR[0], robot[1] + WEST_FOR[1]]
            elif dir == WEST:
                dir = SOUTH
                if 0 <= robot[0] + SOUTH_FOR[0] < N and 0 <= robot[1] + SOUTH_FOR[1] < M and graph[robot[0] + SOUTH_FOR[0]][robot[1] + SOUTH_FOR[1]] == DIRTY:
                    robot = [robot[0] + SOUTH_FOR[0], robot[1] + SOUTH_FOR[1]]
            elif dir == SOUTH:
                dir = EAST
                if 0 <= robot[0] + EAST_FOR[0] < N and 0 <= robot[1] + EAST_FOR[1] < M and graph[robot[0] + EAST_FOR[0]][robot[1] + EAST_FOR[1]] == DIRTY:
                    robot = [robot[0] + EAST_FOR[0], robot[1] + EAST_FOR[1]]
            else:
                dir = NORTH
                if 0 <= robot[0] + NORTH_FOR[0] < N and 0 <= robot[1] + NORTH_FOR[1] < M and graph[robot[0] + NORTH_FOR[0]][robot[1] + NORTH_FOR[1]] == DIRTY:
                    robot = [robot[0] + NORTH_FOR[0], robot[1] + NORTH_FOR[1]]
            break
        else:
            checked += 1
            continue

    if checked == 4:
        dy, dx = -1, -1
        if dir == NORTH:
            dy, dx = robot[0] + NORTH_BACK[0], robot[1] + NORTH_BACK[1]
        elif dir == WEST:
            dy, dx = robot[0] + WEST_BACK[0], robot[1] + WEST_BACK[1]
        elif dir == SOUTH:
            dy, dx = robot[0] + SOUTH_BACK[0], robot[1] + SOUTH_BACK[1]
        else:
            dy, dx = robot[0] + EAST_BACK[0], robot[1] + EAST_BACK[1]
        if (0 <= dy < N and 0 <= dx < M and not graph[dy][dx] == WALL):
            robot = [dy, dx]
        else:
            break

print(answer)
```
