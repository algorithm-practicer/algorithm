# [[BOJ] 좌표 압축](https://www.acmicpc.net/problem/18870)

> [정렬] [값 / 좌표 압축]

## 발상

- 지금 생각해보니 어차피 O(NlogN)이라 정렬을 해도 괜찮지만, 시간복잡도를 줄이는데에 있어 우선순위 큐가 생각남.
- 결국 시간복잡도 O(N)으로 풀이

## <br>정답 코드

```python
"""
시간복잡도: O(NlogN)
"""

import sys
import heapq
readline = sys.stdin.readline

N = int(readline())
X = list(map(int, readline().rstrip().split()))

dictionary = dict()
min_heap = []

for x in set(X):
    heapq.heappush(min_heap, x)

i = 0
while min_heap:
    value = heapq.heappop(min_heap)
    dictionary[value] = i
    i += 1

for x in X:
    print(dictionary[x], end = ' ')

```
