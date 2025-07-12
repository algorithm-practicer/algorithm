# [[BOJ] 절댓값 힙](https://www.acmicpc.net/problem/11286)

> [자료 구조] [우선순위 큐]

## 발상

- 그냥 단순 우선순위 큐를 쓰면 되겠구나

## <br>정답 코드

```python
import sys
import heapq
readline = sys.stdin.readline

POP_OP = 0

N = int(readline())
min_heap = []

for _ in range(N):
    value = int(readline())
    if value == POP_OP:
        if not min_heap:
            print(0)
            continue
        pop_value = heapq.heappop(min_heap)
        print(pop_value[1])
        continue
    heapq.heappush(min_heap, (abs(value), value))
```
