# [[BOJ] 두 배열의 합](https://www.acmicpc.net/problem/2143)

> [자료 구조] [이분 탐색] [누적 합] [해시를 사용한 집합과 맵] [집합과 맵]

## 발상

- 일단 누적합은 DP와 같은 형태처럼 누산시켜놓자.
- 누산시킬 때 해시에 각 누적합의 빈도수를 기록해두자.
- 하나의 해시를 기준으로 다른 해시의 누산값을 찾아보면 됨.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

T = int(readline())
N = int(readline())
A = list(map(int, readline().split()))
M = int(readline())
B = list(map(int, readline().split()))

DP_A = [[0] * N for _ in range(N)]
DP_B = [[0] * M for _ in range(M)]

A_dict = dict()
B_dict = dict()

answer = 0

def set_dict_value(dict, value):
    dict[value] = dict.setdefault(value, 0) + 1

for i in range(N):
    DP_A[i][i] = A[i]
    set_dict_value(A_dict, A[i])

for i in range(M):
    DP_B[i][i] = B[i]
    set_dict_value(B_dict, B[i])

for size in range(1, N):
    for i in range(N - size):
        DP_A[i][i + size] = DP_A[i][i + size - 1] + A[i + size]
        set_dict_value(A_dict, DP_A[i][i + size])

for size in range(1, M):
    for i in range(M - size):
        DP_B[i][i + size] = DP_B[i][i + size - 1] + B[i + size]
        set_dict_value(B_dict, DP_B[i][i + size])

for key in A_dict:
    count = A_dict[key]
    if T - key in B_dict:
        answer += (count * B_dict[T - key])

print(answer)
```
