# [[BOJ] 탑](https://www.acmicpc.net/problem/2493)

> [자료 구조] [스택]

## 발상

- 일단 브루트포스는 시간초과가 남.
- 스택을 써보자

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline
towerLength = int(readline())
towers = list(map(int, readline().split()))
stack = []
answer = [0] * towerLength

for index in list(range(towerLength))[::-1]:
    while stack:
        if stack[-1][0] < towers[index]:
            answer[stack[-1][1]] = index + 1
            stack.pop()
        else:
            break

    stack.append((towers[index], index))

print(*answer, sep=' ')
```
