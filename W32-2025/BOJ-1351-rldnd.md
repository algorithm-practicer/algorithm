# [[BOJ] 무한 수열](https://www.acmicpc.net/problem/1351)

> [다이나믹 프로그래밍] [자료 구조] [해시를 사용한 집합과 맵] [집합과 맵]

## 발상

- DP를 사용하면 되나, bottom-up 구조로 처리하게 되면 배열의 크기가 메모리 제한보다 큼.
- dict 구조 사용하여 top-down 구조로 처리

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N, P, Q = map(int, readline().split())
DP = dict()
DP[0] = 1

def dp(i):
    if i in DP:
        return DP[i]
    DP[i] = dp(i // P) + dp(i // Q)
    return DP[i]

print(dp(N))
```
