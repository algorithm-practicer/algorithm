# [[BOJ] 1, 2, 3 더하기 4](https://www.acmicpc.net/problem/15989)

> [다이나믹 프로그래밍]

## 발상

- 순열 방식처럼 겹치는 방식밖에는 전혀 떠오르지 않았다.
- `한 번 정한 동전은 그 이후에도 같은 방향으로만 사용한다`. 동전 교환 - 중복조합 문제와 비슷한 문제.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

DP = [0] * 10_001
DP[0] = 1

for i in (1, 2, 3):
    for j in range(1, 10_001):
        if j - i >= 0:
            DP[j] += DP[j - i]

for _ in range(int(readline())):
    print(DP[int(readline())])
```
