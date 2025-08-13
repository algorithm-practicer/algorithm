# [[BOJ] 배열 합치기](https://www.acmicpc.net/problem/11728)

> [정렬] [두 포인터]

## 발상

- Merge Sort를 위한 기본 개념

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N, M = map(int, readline().split())
A = list(map(int, readline().split()))
B = list(map(int, readline().split()))
answer = []
a, b = 0, 0

while len(answer) < N + M:
    if a == N:
        answer.append(B[b])
        b += 1
    elif b == M:
        answer.append(A[a])
        a += 1
    elif A[a] < B[b]:
        answer.append(A[a])
        a += 1
    else:
        answer.append(B[b])
        b += 1

print(*answer)

```
