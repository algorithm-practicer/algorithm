# [[BOJ] ACM Craft](https://www.acmicpc.net/problem/1005)

> [다이나믹 프로그래밍] [그래프 이론] [방향 비순환 그래프] [위상 정렬]

## 발상

- 일단 위상정렬을 사용해야함.
- indegree를 빼줄 때마다 해당 방문 시간의 최대값을 갱신

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline

T = int(readline())

for _ in range(T):
    N, K = map(int, readline().split())
    W = [0, *list(map(int, readline().split()))]
    E = [[] for _ in range(N + 1)]
    indegree = [0] * (N + 1)

    for _ in range(K):
        _out, _in = map(int, readline().split())
        E[_out].append(_in)
        indegree[_in] += 1
    answer = int(readline())
    queue = deque()
    DP = [0] * (N + 1)

    for i in range(1, N + 1):
        if not indegree[i]:
            queue.append(i)
            DP[i] = W[i]

    while queue:
        i = queue.popleft()
        for j in E[i]:
            DP[j] = max(DP[i] + W[j], DP[j])
            indegree[j] -= 1
            if not indegree[j]:
                queue.append(j)
    print(DP[answer])

```
