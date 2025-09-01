# [[BOJ] 음악프로그램](https://www.acmicpc.net/problem/2623)

> [그래프 이론] [방향 비순환 그래프] [위상 정렬]

## 발상

- 딱 봐도 위상 정렬 문제

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline

N, M = map(int, readline().split())
indegree = [0] * (N + 1)
E = [[] for _ in range(N + 1)]
queue = deque()
answer = []

for _ in range(M):
    [_, *direction] = list(map(int, readline().split()))
    for i in range(len(direction) - 1):
        E[direction[i]].append(direction[i + 1])
        indegree[direction[i + 1]] += 1

for i in range(1, N + 1):
    if indegree[i] == 0:
        queue.append(i)
        answer.append(i)

while queue:
    u = queue.popleft()
    for v in E[u]:
        indegree[v] -= 1
        if indegree[v] == 0:
            queue.append(v)
            answer.append(v)

print(*answer, sep='\n') if len(answer) == N else print(0)
```
