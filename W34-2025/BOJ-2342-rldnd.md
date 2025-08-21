# [[BOJ] Dance Dance Revolution](https://www.acmicpc.net/problem/2342)

> [다이나믹 프로그래밍]

## 발상

- DP를 써야할 것 같긴 한데, 점화식이 잘 생각이 나지 않음.

## <br>정답 코드

- DP의 경우 보통 아래와 같이 나뉜다고 생각하자..
  - DP[i] -> 1차원 배열로 해결할 수 있는 경우
  - DP[i][j] -> i번째 상황에 j개의 분기를 통해 계산할 수 있는 경우
  - DP[i][j] -> i번째 상황에 모든 경우의 수인 j개를 모두 저장하는 경우
  - DP[i][j][k] -> i번째 상황에 모든 경우의 수인 j \* k를 모두 저장하는 경우
  - Tree or 위상정렬을 이용하는 경우

```python
"""
N <= 100_000

DP[i][left][right] = i번째 지시까지 처리했을 때,
왼발이 left, 오른발이 right에 있을 때의 최소 비용
"""

import sys
readline = sys.stdin.readline

moves = list(map(int, readline().split()))[:-1]
n = len(moves)

def get_cost(from_pos, to_pos):
    if from_pos == 0:
        return 2
    if from_pos == to_pos:
        return 1
    if abs(from_pos - to_pos) == 2:
        return 4
    else:
        return 3

DP = [[[float('inf')] * 5 for _ in range(5)] for _ in range(n + 1)]

DP[0][0][0] = 0

for i in range(n):
    next_pos = moves[i]

    for left in range(5):
        for right in range(5):
            if DP[i][left][right] == float('inf'):
                continue
            if left == right and left != 0:
                continue

            current_cost = DP[i][left][right]

            if right != next_pos:
                new_cost = current_cost + get_cost(left, next_pos)
                DP[i + 1][next_pos][right] = min(DP[i + 1][next_pos][right], new_cost)


            if left != next_pos:
                new_cost = current_cost + get_cost(right, next_pos)
                DP[i + 1][left][next_pos] = min(DP[i + 1][left][next_pos], new_cost)


answer = float('inf')
for left in range(5):
    for right in range(5):
        answer = min(answer, DP[n][left][right])

print(answer)
```
