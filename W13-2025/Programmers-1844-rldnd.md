# [[Programmers] 게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844)

## 발상

- 단순 BFS

## <br>정답 코드

```python
from collections import deque

def solution(maps):
    WALL = 0
    EMPTY = 1
    width = len(maps[0])
    height = len(maps)
    visited = [[False] * width for _ in range(height)]
    q = deque([(1, 0, 0)])
    visited[0][0] = True
    nx = [-1,0,1,0]
    ny = [0,-1,0,1]
    res = -1

    while q:
        count, row, col = q.popleft()
        if row == height - 1 and col == width - 1:
            res = count
            break
        for i in range(4):
            dy = row + ny[i]
            dx = col + nx[i]
            if 0 <= dy < height and 0 <= dx < width and maps[dy][dx] == EMPTY and not visited[dy][dx]:
                visited[dy][dx] = True
                q.append((count + 1, dy, dx))
    return res
```
