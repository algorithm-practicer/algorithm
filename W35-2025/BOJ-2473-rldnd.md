# [[BOJ] 세 용액](https://www.acmicpc.net/problem/2473)

> [정렬] [이분 탐색] [두 포인터]

## 발상

- 투포인터를 써야겠구나.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N = int(readline())
lst = sorted(list(map(int, readline().split())), key = lambda x : x)

answer = float('inf')
answer_lst = []

for i in range(N - 2):
    first = lst[i]

    l, h = i + 1, N - 1

    while l < h and h < N:
        low, high = lst[l], lst[h]
        value = first + low + high
        if abs(value) < answer:
            answer = abs(value)
            answer_lst = [first, low, high]

        if abs(value - low + lst[l + 1]) < abs(value):
            l += 1
        else:
            h -= 1

print(*answer_lst, sep=' ')
```
