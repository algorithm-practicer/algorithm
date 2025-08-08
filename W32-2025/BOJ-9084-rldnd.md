# [[BOJ] 동전](https://www.acmicpc.net/problem/9084)

> [다이나믹 프로그래밍] [배낭 문제]

## 발상

- DP[3] = DP[2] + DP[1] 과 같은 방식으로 푼다고 할 때, 동전의 순서가 변경되며 같은 조합으로 들어가는 일이 생기기에 조합이 아닌 순열 개념이 되어버린다.
- 따라서 i = 몇번째 동전까지 사용했는가, j = 금액일 때, DP[i][j] = DP[i - 1][j] + DP[i]j - coin[i]]

## <br>정답 코드

```python
"""
1 <= T <= 10
1 <= N <= 20
1 <= M <= 10_000
"""

import sys
readline = sys.stdin.readline

T = int(readline())

for _ in range(T):
    N = int(readline())
    coins = list(map(int, readline().split()))
    M = int(readline())
    DP = [[0 for _ in range(M + 1)] for _ in range(N)]

    first_coin = coins[0]
    price = first_coin
    while price <= M:
        DP[0][price] = 1
        price += first_coin

    for i in range(1, N):
        DP[i][0] = 1

        for j in range(1, M + 1):
            DP[i][j] = DP[i - 1][j]
            if j >= coins[i]:
                DP[i][j] += DP[i][j - coins[i]]

    print(DP[N - 1][M])
```
