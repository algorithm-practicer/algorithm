# [[BOJ] 사이클 게임](https://www.acmicpc.net/problem/20040)

> [자료 구조] [분리 집합]

## 발상

- 뭔가 union-find를 사용하면 될 것 같은데, 전혀 다른 방법은 존재하지 않는 것 같아서 union-find사용.
- 이미 같은 집합에 속해있는 두 정점이 연결되는 순간 사이클이 생긴다는 것을 알게 됨.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

V, E = map(int, readline().split())
p = [-1] * V
count = 0

def union(a, b):
    a, b = find(a), find(b)
    if a == b:
        print(count)
        exit()

    if p[a] > p[b]:
        a, b = b, a

    if p[a] == p[b]:
        p[a] -= 1

    p[b] = a

def find(a):
    if p[a] < 0:
        return a
    result = find(p[a])
    p[a] = result
    return p[a]

for _ in range(E):
    count += 1
    u, v = map(int, readline().split())
    union(u, v)

print(0)
```
