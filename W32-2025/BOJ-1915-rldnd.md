# [[BOJ] 가장 큰 정사각형](https://www.acmicpc.net/problem/1915)

> [다이나믹 프로그래밍]

## 발상

- 이걸 DP로 풀 수 있다는 생각을 전혀 하지 못함.
- 왼쪽위의 정사각형 조합에 대해서 그것보다 더 커질 수 있는 경우의수를 생각해보자.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

n, m = map(int, readline().split())
graph = [list(map(int, list(readline().rstrip()))) for _ in range(n)]
DP = [[0] * m for _ in range(n)]
answer = 0

for i in range(n):
    for j in range(m):
        DP[i][j] = graph[i][j]

for i in range(n):
    for j in range(m):
        if graph[i][j] == 0:
            DP[i][j] = 0
        else:
            top_left = 0
            left = 0
            top = 0

            if i > 0:
                top = DP[i - 1][j]
            if j > 0:
                left = DP[i][j - 1]
            if i > 0 and j > 0:
                top_left = DP[i - 1][j - 1]

            DP[i][j] = min(top_left, left, top) + 1
            answer = max(answer, DP[i][j])

print(answer ** 2)
```
