# [[BOJ] 집합의 표현](https://www.acmicpc.net/problem/1717)

> [자료 구조] [분리 집합] [Union-Find]

## 발상

- Union-Find를 사용하면 된다.
- Union by Rank와 경로 압축을 모두 사용하면 **O(M × α(N))** 시간복잡도로 해결할 수 있다.
  - M: 연산의 개수 (최대 100,000)
  - N: 원소의 개수 (최대 1,000,000)
  - α(N): 아커만 함수의 역함수 (실질적으로 상수로 취급)

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

n, m = map(int, readline().split())
p = [-1] * (n + 1)

def find(a):
    if p[a] < 0:
        return a

    value = find(p[a])
    p[a] = value
    return value

def union(a, b):
    a = find(a)
    b = find(b)
    if(a == b):
        return
    if p[a] > p[b]:
        a, b = b, a

    if p[a] == p[b]:
        p[a] -= 1
    p[b] = a

for _ in range(m):
    c, a, b = map(int, readline().split())
    if not c:
        union(a, b)
    else:
        print('YES') if find(a) == find(b) else print('NO')
```
