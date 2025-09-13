# [[BOJ] 감시](https://www.acmicpc.net/problem/15683)

> [구현] [브루트포스 알고리즘] [시뮬레이션] [백트래킹]

## 발상

- 1 <= N, M <= 8 모든 곳 확인

- CCTV <= 8, CCTV 최대 경우의수 65_000 언저리

- 브루스포스 + 백트래킹

## <br>정답 코드

```python
import sys
import copy
readline = sys.stdin.readline
EMPTY, WALL = 0, 6
CHECK = 7
TOP, RIGHT, BOTTOM, LEFT = 'top', 'right', 'bottom', 'left'

directions = {
    1: [[RIGHT], [BOTTOM], [LEFT], [TOP]],
    2: [[LEFT, RIGHT], [TOP, BOTTOM]],
    3: [[TOP, RIGHT], [RIGHT, BOTTOM], [BOTTOM, LEFT], [LEFT, TOP]],
    4: [[LEFT, TOP, RIGHT], [TOP, RIGHT, BOTTOM], [RIGHT, BOTTOM, LEFT], [BOTTOM, LEFT, TOP]],
    5: [[TOP, RIGHT, BOTTOM, LEFT]]
}

N, M = map(int, readline().split())
lst = [[] for _ in range(N)]
cctv_coord = []
cctv_dir = []
answer = 1e9

for i in range(N):
    row = list(map(int, readline().split()))
    for j in range(M):
        item = row[j]
        if not item == EMPTY and not item == WALL:
            cctv_coord.append((i, j))
        lst[i].append(item)

def back_tracking(lst, idx):
    global answer
    if idx == len(cctv_coord):
        temp = 0
        for i in range(N):
            for j in range(M):
                if lst[i][j] == EMPTY:
                    temp += 1

        answer = min(answer, temp)
        return

    cctv = cctv_coord[idx]
    available_directions = directions[lst[cctv[0]][cctv[1]]]

    for dir_lst in available_directions:
        _lst = copy.deepcopy(lst)

        if RIGHT in dir_lst:
            point = [cctv[0], cctv[1]]
            point[1] += 1
            while 0 <= point[0] < N and 0 <= point[1] < M and not lst[point[0]][point[1]] == WALL:
                if not _lst[point[0]][point[1]] == EMPTY:
                    point[1] += 1
                else:
                    _lst[point[0]][point[1]] = CHECK
                    point[1] += 1
        if TOP in dir_lst:
            point = [cctv[0], cctv[1]]
            point[0] -= 1
            while 0 <= point[0] < N and 0 <= point[1] < M and not lst[point[0]][point[1]] == WALL:
                if not _lst[point[0]][point[1]] == EMPTY:
                    point[0] -= 1
                else:
                    _lst[point[0]][point[1]] = CHECK
                    point[0] -= 1
        if LEFT in dir_lst:
            point = [cctv[0], cctv[1]]
            point[1] -= 1
            while 0 <= point[0] < N and 0 <= point[1] < M and not lst[point[0]][point[1]] == WALL:
                if not _lst[point[0]][point[1]] == EMPTY:
                    point[1] -= 1
                else:
                    _lst[point[0]][point[1]] = CHECK
                    point[1] -= 1
        if BOTTOM in dir_lst:
            point = [cctv[0], cctv[1]]
            point[0] += 1
            while 0 <= point[0] < N and 0 <= point[1] < M and not lst[point[0]][point[1]] == WALL:
                if not _lst[point[0]][point[1]] == EMPTY:
                    point[0] += 1
                else:
                    _lst[point[0]][point[1]] = CHECK
                    point[0] += 1

        back_tracking(_lst, idx + 1)

back_tracking(lst, 0)
print(answer)
```
