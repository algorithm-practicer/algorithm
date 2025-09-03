# [[BOJ] RGB거리 2](https://www.acmicpc.net/problem/17404)

> [다이나믹 프로그래밍]

## 발상

- 지금까지 DP를 풀었을 땐, DP 테이블이 전역적으로 공유가 된다는게 너무 당연시했음.
- 하지만 이 문제에서는 처음 어떤 집을 선택하느냐에 따라 마지막집의 선택 색깔에 영향을 주기 때문에, 테이블을 채우는 경우의 수를 나눠야함.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

INF = float('inf')

N = int(readline())
W = [[] for _ in range(N)]
for i in range(N):
    W[i] = list(map(int, readline().split()))

answer = INF

for i in range(3):
    DP = [[INF, INF, INF] for _ in range(N)]
    DP[0][i] = W[0][i]

    for j in range(1, N):
        DP[j][0] = min(DP[j - 1][1:]) + W[j][0]
        DP[j][1] = min(DP[j - 1][0], DP[j - 1][2]) + W[j][1]
        DP[j][2] = min(DP[j - 1][:2]) + W[j][2]

    for j in range(3):
        if not i == j:
            answer = min(answer, DP[N - 1][j])

print(answer)
```
