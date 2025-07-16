# [[BOJ] 팰린드롬?](https://www.acmicpc.net/problem/10942)

> [다이나믹 프로그래밍]

## 발상

- 일단 단순히 순회를 돌려보자.

## <br>[Optional] 틀린 풀이 코드 및 틀린 이유

- 시간복잡도가 O(2,000,000,000)이 나오니 for문 하나 돌려도 에러나겠구나..

```python
import sys
readline = sys.stdin.readline

"""
1 <= N <= 2_000
1 <= M <= 1_000_000
"""

N_len = int(readline())
N = list(readline().rstrip().split())
M_len = int(readline())

for _ in range(M_len):
    S, E = map(lambda x: int(x) - 1, readline().split())
    if S == E:
        print(1)
        continue
    comp = N[S:E + 1]
    has_done = False
    for i in range(len(comp) // 2):
        if not comp[i] == comp[-1 - i]:
            print(0)
            has_done = True
            break
    if not has_done:
        print(1)
```

## <br>정답 코드

- DP로 구현하긴 했는데, 바로 떠올리질 못했다

```python
import sys
readline = sys.stdin.readline

N_len = int(readline())
DP = [[0] * N_len for _ in range(N_len)]

N = list(readline().rstrip().split())

for i in range(N_len):
    DP[i][i] = 1

for i in range(N_len - 1):
    if N[i] == N[i + 1]:
        DP[i][i + 1] = 1

for i in range(2, N_len):
    for s in range(N_len - i):
        if N[s] == N[s + i] and DP[s+1][s + i - 1] == 1:
            DP[s][s + i] = 1

for _ in range(int(readline())):
    S, E = map(lambda x: int(x) - 1, readline().split())
    print(DP[S][E])
```
