# [[BOJ] 부분수열의 합](https://www.acmicpc.net/problem/1182)

> [브루투포스 알고리즘] [백트래킹]

## 발상

- 백트래킹 + 가지치기

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N, S = map(int, readline().split())
lst = list(map(int, readline().split()))
answer = 0
count = 0

used = [False] * N

def back_tracking(start):
    global count, answer
    if count == S and len(list(filter(lambda x: x, used))):
        answer += 1

    for i in range(start, N):
        count += lst[i]
        used[i] = True
        back_tracking(i + 1)
        count -= lst[i]
        used[i] = False

back_tracking(0)
print(answer)
```
