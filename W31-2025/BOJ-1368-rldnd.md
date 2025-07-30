# [[BOJ] 물대기](https://www.acmicpc.net/problem/1368)

> [그래프 이론] [최소 스패닝 트리]

## 발상

- 처음에는 MST만을 사용해서 처리는 불가능하다고 생각했음.
- 하지만 우물을 파는. 즉 본인 정점을 순회하는 것을 정점 하나를 추가하는 방식으로 구현하면 MST만으로 구현이 가능하다는 것을 알게 됨

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N = int(readline())
V = N + 1
p = [-1] * V
edges = []
checked_edges = 0
top = 0
answer = 0

def find(value):
    if p[value] < 0:
        return value
    result = find(p[value])
    p[value] = result
    return result

def union(a, b):
    a = find(a)
    b = find(b)

    if a == b:
        return

    if p[a] > p[b]:
        a, b = b, a

    if p[a] == p[b]:
        p[a] -= 1

    p[b] = a

for i in range(N):
    edges.append((i, N, int(readline())))

for i in range(N - 1):
    row = list(map(int, readline().split()))
    for j in range(i + 1, N):
        edges.append((i, j, row[j]))

edges.sort(key = lambda x: x[2])

while checked_edges < V - 1:
    a, b, w = edges[top]
    top += 1

    if find(a) == find(b):
        continue

    union(a, b)
    checked_edges += 1
    answer += w

print(answer)
```
