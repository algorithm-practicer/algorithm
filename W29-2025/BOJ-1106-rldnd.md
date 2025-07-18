# [[BOJ] 호텔](https://www.acmicpc.net/problem/1106)

> [다이나믹 프로그래밍] [배낭 문제]

## 발상

- DP를 써보자

## <br> 틀린 풀이 코드 및 틀린 이유

- DP의 인덱스를 기준으로 보는 게 아니라, 도시를 기준으로 순회를 하기에 결국 DP가 최적화되지 않은 상태에서 계산이 가능해질 수 있었다..

```python
import sys
readline = sys.stdin.readline

MAX = 2000
INF = float('INF')
DP = [INF] * MAX
C, N = map(int, readline().split())
LIST = []

for _ in range(N):
    w, n = map(int, readline().split())
    LIST.append((w, n))

for w, n in LIST:
    for i in range(MAX):
        if n * i < MAX:
            DP[n * i] = min(DP[n * i], i * w)
            DP[n * i] = min(DP[n * i], DP[n * i - n] + w)

print(0) if not C else print(min(DP[C:]))
```

## <br>정답 코드

- 사실 기준을 바꾼 것 뿐인데 해결이됨..

```python
import sys
readline = sys.stdin.readline

C, N = map(int, readline().split())
LIST = []

for _ in range(N):
    w, n = map(int, readline().split())
    LIST.append((w, n))

MAX = C + 100
dp = [float('inf')] * (MAX + 1)
dp[0] = 0


for i in range(1, MAX + 1):
    for w, n in LIST:
        if i >= n:
            dp[i] = min(dp[i], dp[i - n] + w)
        else:
            dp[i] = min(dp[i], w)

result = min(dp[C:MAX + 1])
print(result)
```
