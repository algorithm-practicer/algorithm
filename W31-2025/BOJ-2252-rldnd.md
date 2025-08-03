# [[BOJ] 줄 세우기](https://www.acmicpc.net/problem/2252)

> [그래프 이론] [방향 비순환 그래프] [위상 정렬]

## 발상

- 위상 정렬 연습

## <br>정답 코드

```python
"""
1 <= N (학생 수) <= 32_000
1 <= M (비교횟수) <= 100_000
시간복잡도: O(N + M): O(132000)
"""

import sys
from collections import deque
readline = sys.stdin.readline

N, M = map(int, readline().split())
queue = deque([])
edge = [[] for _ in range(N + 1)]
indegree = [0] * (N + 1)
answer = []

for _ in range(M):
    _out, _in = map(int, readline().split())
    edge[_out].append(_in)
    indegree[_in] += 1

for i in range(1, N + 1):
    if not indegree[i]:
        queue.append(i)

while queue:
    v = queue.popleft()
    answer.append(v)

    for i in edge[v]:
        indegree[i] -= 1
        if not indegree[i]:
            queue.append(i)

print(*answer)
```
