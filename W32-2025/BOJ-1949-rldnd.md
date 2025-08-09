# [[BOJ] 우수 마을](https://www.acmicpc.net/problem/1949)

> [다이나믹 프로그래밍] [트리] [트리에서의 다이나믹 프로그래밍]

## 발상

- 리프노드를 먼저 기준으로 DP 값을 세팅.
- 부모 노드로 올라가면서 DP 값을 갱신.

## <br>정답 코드

```python
import sys
sys.setrecursionlimit(10 ** 8)
readline = sys.stdin.readline

N = int(readline())
V = [-1, *list(map(int, readline().split()))]
E = [[] for _ in range(N + 1)]
DP = [[0, 0] for _ in range(N + 1)]

for _ in range(N - 1):
    u, v = map(int, readline().split())
    E[u].append(v)
    E[v].append(u)

def dfs(prev, start):
    if len(E[start]) == 1 and E[start][0] == prev:
        DP[start][0] = 0
        DP[start][1] = V[start]
        return

    for i in E[start]:
        if not i == prev:
            dfs(start, i)
            DP[start][0] += max(DP[i][1], DP[i][0])
            DP[start][1] += DP[i][0]

    DP[start][1] += V[start]

dfs(-1, 1)
print(max(DP[1]))
```
