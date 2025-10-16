# [[BOJ] 전깃줄](https://www.acmicpc.net/problem/2565)

> [다이나믹 프로그래밍]

## 발상

- 왼쪽 연결 점을 u, 오른쪽 연결 점을 v라고 하자.
- 꼬이지 않으려면 u를 기준으로 오름차순으로 정렬한 뒤, v에 대해 LIS를 구하면 된다.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N = int(readline())
numbers = []
DP = [1] * N

for _ in range(N):
    u, v = map(int, readline().split())
    numbers.append((u, v))

numbers.sort(key = lambda x: x[0])

for i in range(N):
    numbers[i] = numbers[i][1]

for i in range(N):
    for j in range(0, i):
        if numbers[i] > numbers[j]:
            DP[i] = max(DP[i], DP[j] + 1)

print(N - max(DP))

```
