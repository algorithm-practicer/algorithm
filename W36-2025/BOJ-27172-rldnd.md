# [[BOJ] 수 나누기 게임](https://www.acmicpc.net/problem/27172)

> [수학] [브루트포스 알고리즘] [정수론] [소수 판정] [에라토스테네스의 체] [소인수분해]

## 발상

- 일단 combination을 생각하면 시간복잡도가 너무 커진다.
- 가능한 방법을 생각해봤는데, 에라토스테네스의 체와 비슷하게 형상을 만들면 될거같음.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline
MAX = 1_000_001

N = int(readline())
lst = list(map(int, readline().split()))

exists = [False] * MAX
graph = [0] * MAX

for i in lst:
    exists[i] = True

for i in range(1, MAX):
    if not exists[i]:
        continue
    j = 2
    while i * j < MAX:
        if not exists[i * j]:
            j += 1
            continue
        graph[i] += 1
        graph[i * j] -= 1
        j += 1

for i in lst:
    print(graph[i], end=' ')
```
