# [[BOJ] 카잉 달력](https://www.acmicpc.net/problem/6064)

> [수학] [브루트포스 알고리즘] [정수론] [중국인의 나머지 정리]

## 발상

- 연립합동방정식을 이용

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

"""
1 <= M, N <= 40000
1 <= x <= M
1 <= y <= N
"""

def gcd(a, b):
    if a < b:
        a, b = b, a
    while b:
        a, b = b, a % b
    return a

lcm = lambda x, y: x // gcd(x, y) * y

T = int(readline())

def get_answer():
    M, N, x, y = map(int, readline().split())
    if M == x:
        x = 0
    if N == y:
        y = 0
    maximum = lcm(M, N)
    cases = []
    case = x if not x == 0 else M
    is_done = False

    while case <= maximum:
        cases.append(case)
        case += M

    for i in cases:
        if i % N == y and not is_done:
            print(i)
            is_done = True

    if not is_done:
        print(-1)

for _ in range(T):
    get_answer()
```
