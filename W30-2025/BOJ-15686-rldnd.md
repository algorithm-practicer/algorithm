# [[BOJ] 치킨 배달](https://www.acmicpc.net/problem/15686)

> [BFS] [백트래킹]

> _위와 같이 만약 사용한 알고리즘 기술 및 자료구조가 있다면, 적어주세요._

## 발상

- 치킨집을 M개 선택하는 모든 조합을 구한 후, 각 조합에 대해 BFS를 수행하여 치킨 거리의 합을 구한다.

## <br>틀린 풀이 코드 및 틀린 이유

- 시간 초과.
- 시간복잡도가 진짜 너무 높음.

```python
import sys
from collections import deque
readline = sys.stdin.readline

N, M = map(int, readline().split())
EMPTY, HOUSE, CHICKEN = 0, 1, 2
lst = [list(map(int, readline().split())) for _ in range(N)]

ny = [-1, 0, 1, 0]
nx = [0, -1, 0, 1]

chickens = []
answer = float('inf')

for i in range(N):
    for j in range(N):
        if lst[i][j] == CHICKEN:
            chickens.append((i, j))


def back_tracking(used: list, count):
    global chickens, lst, answer

    if count == M:
        selected_chickens = []
        for i, value in enumerate(used):
            if used[i]:
                selected_chickens.append(chickens[i])

        queue = deque()
        visited = [[False] * N for _ in range(N)]
        distance = 0
        for y, x in selected_chickens:
            queue.append((y, x, 0))
            visited[y][x] = True

        while queue:
            _y, _x, d = queue.popleft()
            if lst[_y][_x] == HOUSE:
                distance += d

            for i in range(4):
                dy = _y + ny[i]
                dx = _x + nx[i]
                if 0 <= dy < N and 0 <= dx < N and not visited[dy][dx]:
                    visited[dy][dx] = True
                    queue.append((dy, dx, d + 1))
        answer = min(answer, distance)

    for idx, _ in enumerate(chickens):
        if not used[idx] and count + 1 <= M:
            used[idx] = True
            back_tracking(used, count + 1)
            used[idx] = False

back_tracking([False] * len(chickens), 0)

print(answer)
```

## <br>틀린 풀이 코드 및 틀린 이유2

- 미리 거리들을 모두 계산해놓고 백트래킹으로 조합을 구하는 방식으로 변경.
- 시간초과
- 조합을 사용하고는 있었으나, permutation이 아니기에 앞단부터 시작할 필요가 없는데 그걸 고려하지 않음.

```python
import sys
readline = sys.stdin.readline

EMPTY, HOUSE, CHICKEN = 0, 1, 2

N, M = map(int, readline().split())
lst = [list(map(int, readline().split())) for _ in range(N)]

# 집 리스트
houses = []

# 치킨집 리스트
chickens = []

# 거리 리스트 2중배열
distances = []

answer = float('inf')

for i in range(N):
    for j in range(N):
        if lst[i][j] == CHICKEN:
            chickens.append((i, j))
        if lst[i][j] == HOUSE:
            houses.append((i, j))

for i in range(len(houses)):
    distances.append([])

    for j in range(len(chickens)):
        house = houses[i]
        chicken = chickens[j]
        d = abs(house[0] - chicken[0]) + abs(house[1] - chicken[1])
        distances[i].append(d)

def back_tracking(used):
    global answer, houses, chickens, distances

    if len(list(filter(lambda x: x == True, used))) == M:
        housed_d = [float('inf')] * len(houses)
        for j, _ in enumerate(used):
            if used[j]:
                for i in range(len(houses)):
                    housed_d[i] = min(housed_d[i], distances[i][j])
        answer = min(answer, sum(housed_d))
        return

    for i in range(len(chickens)):
        if not used[i]:
            used[i] = True
            back_tracking(used)
            used[i] = False

back_tracking([False] * len(chickens))
print(answer)
```

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

EMPTY, HOUSE, CHICKEN = 0, 1, 2

N, M = map(int, readline().split())
lst = [list(map(int, readline().split())) for _ in range(N)]

# 집 리스트
houses = []

# 치킨집 리스트
chickens = []

# 거리 리스트 2중배열
distances = []

answer = float('inf')

for i in range(N):
    for j in range(N):
        if lst[i][j] == CHICKEN:
            chickens.append((i, j))
        if lst[i][j] == HOUSE:
            houses.append((i, j))

for i in range(len(houses)):
    distances.append([])

    for j in range(len(chickens)):
        house = houses[i]
        chicken = chickens[j]
        d = abs(house[0] - chicken[0]) + abs(house[1] - chicken[1])
        distances[i].append(d)

def back_tracking(used, selected_count, start):
    global answer, houses, chickens, distances

    if selected_count == M:
        housed_d = [float('inf')] * len(houses)
        for j, _ in enumerate(used):
            if used[j]:
                for i in range(len(houses)):
                    housed_d[i] = min(housed_d[i], distances[i][j])
        answer = min(answer, sum(housed_d))
        return

    if len(chickens) - start + selected_count < M:
        return

    for i in range(start, len(chickens)):
        if not used[i]:
            used[i] = True
            back_tracking(used, selected_count + 1, i + 1)
            used[i] = False

back_tracking([False] * len(chickens), 0, 0)
print(answer)
```
