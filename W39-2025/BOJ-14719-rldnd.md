# [[BOJ] 빗물](https://www.acmicpc.net/problem/14719)

> [구현] [시뮬레이션]

## 발상

- 시간복잡도를 보니, 그냥 브루트포스로 구현해도 됨.
- y축을 기준으로, 벽을 만날 때마다 그 사이의 빗물 양을 계산해주면 됨.
  - 단, 처음 벽을 마주친 상황은 제외

## <br>정답 코드

```python
NOT_ENCOUNTERED = -1

import sys
readline = sys.stdin.readline

water = 0
height, width = map(int, readline().split())
wallHeights = list(map(int, readline().split()))

for y in range(height):
    encounteredWallIndex = NOT_ENCOUNTERED

    for x in range(width):
        wallHeight = wallHeights[x]
        if wallHeight > y:
            if not encounteredWallIndex == NOT_ENCOUNTERED:
                water += (x - encounteredWallIndex - 1)
            encounteredWallIndex = x

print(water)
```
