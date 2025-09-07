# [[BOJ] LCS 2](https://www.acmicpc.net/problem/9252)

> [다이나믹 프로그래밍] [문자열] [역추적] [최장 공통 부분 수열 문제]

## 발상

- 표를 만들어보면서 점화식을 유추해보자

## <br>틀린 풀이 코드 및 틀린 이유

```python
import sys
readline = sys.stdin.readline

A = list(readline().rstrip())
B = list(readline().rstrip())
a = len(A)
b = len(B)

DP = [[0] * a for _ in range(b)]

for i in range(b):
    for j in range(a):
        if not j:
            if A[j] == B[i]:
                DP[i][j] = 1
            else:
                DP[i][j] = DP[i - 1][j]
            continue

        if not i:
            if A[j] == B[i]:
                DP[i][j] = 1
            else:
                DP[i][j] = DP[i][j - 1]

        if A[j] == B[i]:
            DP[i][j] = DP[i - 1][j - 1] + 1
        else:
            DP[i][j] = max(DP[i - 1][j], DP[i][j - 1])

point = 0
answer = ''
for i in range(a):
    if DP[-1][i] > point:
        point += 1
        answer += A[i]
    else:
        continue

print(point)
print(answer)
```

## <br>정답 코드

- 추적하는 방법 변경

```python
import sys
readline = sys.stdin.readline

A = list(readline().rstrip())
B = list(readline().rstrip())
a = len(A)
b = len(B)

DP = [[0] * (b + 1) for _ in range(a + 1)]

for i in range(1, a + 1):
    for j in range(1, b + 1):
        if A[i-1] == B[j-1]:
            DP[i][j] = DP[i-1][j-1] + 1
        else:
            DP[i][j] = max(DP[i-1][j], DP[i][j-1])

print(DP[a][b])

if DP[a][b] > 0:
    lcs = []
    i, j = a, b
    while i > 0 and j > 0:
        if A[i-1] == B[j-1]:
            lcs.append(A[i-1])
            i -= 1
            j -= 1
        elif DP[i-1][j] > DP[i][j-1]:
            i -= 1
        else:
            j -= 1

    print(''.join(reversed(lcs)))
```
