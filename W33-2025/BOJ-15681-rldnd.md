# [[BOJ] 트리와 쿼리](https://www.acmicpc.net/problem/15681)

> [다이나믹 프로그래밍] [그래프 이론] [그래프 탐색] [트리] [깊이 우선 탐색] [트리에서의 다이나믹 프로그래밍]

## 발상

-DFS를 쓰면서 자식 노드 dp 값을 누산시켜놓자.

## <br>정답 코드

```python
import sys
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

N, R, Q = map(int, readline().split())
E = [[] for _ in range(N + 1)]
dp = [1] * (N + 1)

for _ in range(N - 1):
    u, v = map(int, readline().split())
    E[u].append(v)
    E[v].append(u)

def dfs(prev, start):
    if len(E[start]) == 1 and E[start][0] == prev:
        return

    for i in E[start]:
        if not prev == i:
            dfs(start, i)
            dp[start] += dp[i]

dfs(0, R)

for _ in range(Q):
    print(dp[int(readline())])
```
