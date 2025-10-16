# [[BOJ] 전깃줄 2](https://www.acmicpc.net/problem/2568)

> [역추적] [가장 긴 증가하는 부분 수열 문제]

## 발상

- 전깃줄과 동일한 로직으로 처리.
- binary search를 사용해 시간복잡도를 O(N log N)으로 줄임.
- DP 배열을 사용해 LIS 길이를 기록.
- DP 배열을 역순으로 순회하며, LIS에 포함된 인덱스를 tempAnswer에 기록.
- tempAnswer에 포함되지 않은 인덱스의 전깃줄을 answer에 기록.
- answer를 오름차순으로 출력.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

def bisectLeft(array, target):
    left, right = 0, len(array) - 1

    while left <= right:
        mid = (left + right) // 2
        if array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left

N = int(readline())
lines = []
linesDestination = []

for _ in range(N):
    u, v = map(int, readline().split())
    lines.append((u, v))

lines.sort(key = lambda x: x[0])

for i in range(N):
    linesDestination.append(lines[i][1])

DP = [1] * N
lis = [linesDestination[0]]

for i in range(1, N):
    if linesDestination[i] > lis[-1]:
        lis.append(linesDestination[i])
        DP[i] = len(lis)
        continue
    idx = bisectLeft(lis, linesDestination[i])
    DP[i] = idx + 1
    lis[idx] = linesDestination[i]

lisLength = len(lis)
tempAnswer = []

current_length = lisLength
for i in range(N - 1, -1, -1):
    if DP[i] == current_length:
        tempAnswer.append(i)
        current_length -= 1
        if current_length == 0:
            break

tempAnswer_set = set(tempAnswer)

answer = []
for i in range(N):
    if i not in tempAnswer_set:
        answer.append(lines[i][0])

print(len(answer))
for a in answer:
    print(a)

```
