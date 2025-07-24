# [[BOJ] 헌내기는 친구가 필요해](https://www.acmicpc.net/problem/21736)

> [그래프 이론] [그래프 탐색] [너비 우선 탐색] [깊이 우선 탐색] [격자 그래프]

## 발상

- 단순 BFS로 풀면 되겠구나
- 시간복잡도를 따져보니 O(5V^2) = O(5 \* 600 \* 600) = O(1,800,000) 이므로 널널

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline

ny = [-1, 0, 1, 0]
nx = [0, -1, 0, 1]

EMPTY, WALL, DOYEON, PERSON = 'O', 'X', 'I', 'P'
N, M = map(int, readline().split())
lst = []
queue = deque()
visited = [[False] * M for _ in range(N)]
answer = 0

for i in range(N):
    lst.append(list(readline().rstrip()))
    for j in range(M):
        if lst[i][j] == DOYEON:
            queue.append((i, j))
            visited[i][j] = True

while queue:
    y, x = queue.popleft()
    for i in range(4):
        dy = y + ny[i]
        dx = x + nx[i]
        if 0 <= dy < N and 0 <= dx < M and not visited[dy][dx] and not lst[dy][dx] == WALL:
            visited[dy][dx] = True
            queue.append((dy, dx))
            if lst[dy][dx] == PERSON:
                answer += 1

print(answer) if answer else print('TT')
```
