# [[BOJ] 소인수분해](https://www.acmicpc.net/problem/11653)

> [수학] [정수론] [소수 판정] [소인수분해]

## 발상

- 소인수분해를 구하자.
- 시간복잡도는 O(sqrt(N))으로 충분하다.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N = int(readline())
i = 2
answer = []

while i * i <= N:
    if not N % i:
        N //= i
        answer.append(i)

    if N % i:
        i += 1

if not N == 1:
    answer.append(N)

print(*answer, sep='\n')
```
