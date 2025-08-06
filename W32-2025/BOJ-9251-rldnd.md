# [[BOJ] LCS](https://www.acmicpc.net/problem/9251)

> [다이나믹 프로그래밍] [문자열] [최장 공통 부분 수열 문제]

## 발상

- DP 사용
- A의 i번째, B의 j번째 문자를 비교하여, 두 문자가 같으면 LCS 길이를 1 증가시키고, 다르면 이전의 LCS 길이를 유지한다.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

A = list(readline().rstrip())
B = list(readline().rstrip())

n, m = len(A), len(B)

DP = [[0] * (m + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    for j in range(1, m + 1):
        if A[i - 1] == B[j - 1]:
            DP[i][j] = DP[i - 1][j - 1] + 1
        DP[i][j] = max(DP[i][j], DP[i-1][j], DP[i][j - 1])

print(DP[n][m])
```
