# [[BOJ] 이항 계수 2](https://www.acmicpc.net/problem/11051)

> [수학] [다이나믹 프로그래밍] [조합론]

## 발상

- 이항 계수 + DP

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

table = [[1] for _ in range(1001)]
MOD = 10007

table[1].append(1)
table[2].append(2)
table[2].append(1)

for i in range(3, 1001):
    for j in range(1, i + 1):
        if i == j:
            table[i].append(1)
        else:
            table[i].append((table[i - 1][j] + table[i - 1][j - 1]) % MOD)

N, K = map(int, readline().split())
print(table[N][K])
```
