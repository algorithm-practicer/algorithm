# [[BOJ] 톱니바퀴](https://www.acmicpc.net/problem/14891)

> [구현] [시뮬레이션]

## 발상

- 한번의 스냅샷에서 돌아가는 방향들이 모두 정해지는 거니까, 미리 돌아갈 방향들을 계산해놓자. _~~문제가 엄청 기네;~~_

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N, S = '0', '1'
CLOCK, REVERSE_CLOCK, NONE = 1, -1, 0

A = [list(readline().rstrip()) for _ in range(4)]

def turn_func(idx, direction):
    if direction == NONE:
        return

    copy = A[idx][:]
    if direction == CLOCK:
        for i in range(8):
            A[idx][(i + 1) % 8] = copy[i]
    else:
        for i in range(8):
            index = 7 if i - 1 == -1 else i - 1
            A[idx][index] = copy[i]

# 체크해야하는 INDEX: 왼쪽의 2와 오른쪽의 6
K = int(readline())

for _ in range(K):
    idx, direction = map(int, readline().split())
    idx = idx - 1
    directions = [NONE] * 4
    directions[idx] = direction

    left_idx = idx - 1
    right_idx = idx + 1

    while left_idx >= 0:
        if not A[left_idx + 1][6] == A[left_idx][2]:
            directions[left_idx] = directions[left_idx + 1] * -1
        left_idx -= 1

    while right_idx <= 3:
        if not A[right_idx][6] == A[right_idx - 1][2]:
            directions[right_idx] = directions[right_idx - 1] * -1
        right_idx += 1

    for i in range(4):
        turn_func(i, directions[i])

answer = 0
for i in range(4):
    if A[i][0] == S:
        answer += (2 ** i)

print(answer)
```
