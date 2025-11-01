# Bellman-Ford [벨만-포드]

## 정의

하나의 시작점으로부터 다른 모든 정점까지의 최단거리를 구하는 알고리즘으로, **음수 가중치 간선이 있어도 작동**하며 **음수 사이클 존재 여부를 판별**할 수 있다.

## 연습문제

백준 11657, 1865, 1219번

## 과정

1. 모든 정점까지의 최단 거리를 무한대로 초기화하고, 시작점은 0으로 설정
2. 모든 간선에 대해 다음을 수행: 현재 간선을 거쳐가는 것이 더 짧은 경로라면 최단 거리를 갱신
3. 2번 과정을 (V-1)번 반복 (V는 정점의 개수)
4. 모든 간선에 대해 한 번 더 확인하여, 거리가 갱신되면 음수 사이클이 존재

## 특징

- **음수 가중치 간선**이 있어도 사용 가능한 알고리즘
- **음수 사이클 감지** 가능
- 다익스트라보다 느리지만 더 범용적
- 하나의 시작점에서 모든 정점까지의 최단 거리를 구함

> [!NOTE]
>
> 시간복잡도: O(VE) // V: 정점, E: 간선

## 왜 (V-1)번 반복하는가?

> [!NOTE]
>
> 최단 경로는 최대 (V-1)개의 간선을 사용한다. (사이클이 없다면)
>
> 따라서 (V-1)번 모든 간선을 확인하면, 모든 최단 경로를 찾을 수 있다.
>
> 만약 V번째 반복에서도 거리가 갱신된다면, 이는 음수 사이클이 존재한다는 의미이다.

## 음수 사이클

> [!IMPORTANT]
>
> 음수 사이클: 사이클을 구성하는 간선들의 가중치 합이 음수인 사이클
>
> 음수 사이클이 존재하면 그 사이클을 계속 돌면서 거리를 무한히 감소시킬 수 있으므로, 최단 거리가 정의되지 않는다.

### 음수 사이클 판별 방법

(V-1)번 반복 후, 모든 간선에 대해 한 번 더 확인:

- 거리가 갱신되는 간선이 있다면 → 음수 사이클 존재
- 갱신되지 않는다면 → 음수 사이클 없음

## 경로 복원 방법

> [!IMPORTANT]
>
> 최단 거리 테이블이 갱신될 때 이전 정점을 기록하면 된다.
>
> `parent[v] = u` (u에서 v로 가는 간선으로 최단 거리 갱신 시)

## 다익스트라 vs 벨만-포드

| 특징             | 다익스트라     | 벨만-포드      |
| ---------------- | -------------- | -------------- |
| 시간복잡도       | O(E log V)     | O(VE)          |
| 음수 가중치      | 불가능         | 가능           |
| 음수 사이클 감지 | 불가능         | 가능           |
| 사용 시기        | 음수 간선 없음 | 음수 간선 있음 |

## 구현 예시 (Python)

### 기본 벨만-포드

```python
import sys
input = sys.stdin.readline
INF = int(1e9)

def bellman_ford(start, n, edges):
    # 거리 테이블 초기화
    dist = [INF] * (n + 1)
    dist[start] = 0

    # (V-1)번 반복
    for i in range(n - 1):
        # 모든 간선 확인
        for u, v, cost in edges:
            # 현재 간선을 거쳐가는 것이 더 짧다면
            if dist[u] != INF and dist[u] + cost < dist[v]:
                dist[v] = dist[u] + cost

    # 음수 사이클 확인
    has_negative_cycle = False
    for u, v, cost in edges:
        if dist[u] != INF and dist[u] + cost < dist[v]:
            has_negative_cycle = True
            break

    return dist, has_negative_cycle

# 사용 예시
n, m = map(int, input().split())  # n: 정점 수, m: 간선 수
edges = []
for _ in range(m):
    u, v, cost = map(int, input().split())
    edges.append((u, v, cost))

dist, has_cycle = bellman_ford(1, n, edges)

if has_cycle:
    print("음수 사이클 존재")
else:
    for i in range(1, n + 1):
        print(f"1 → {i}: {dist[i] if dist[i] != INF else '도달 불가'}")
```

### 경로 복원 포함

```python
def bellman_ford_with_path(start, n, edges):
    dist = [INF] * (n + 1)
    parent = [-1] * (n + 1)  # 경로 복원용
    dist[start] = 0

    for i in range(n - 1):
        for u, v, cost in edges:
            if dist[u] != INF and dist[u] + cost < dist[v]:
                dist[v] = dist[u] + cost
                parent[v] = u  # 이전 정점 기록

    # 음수 사이클 확인
    has_negative_cycle = False
    for u, v, cost in edges:
        if dist[u] != INF and dist[u] + cost < dist[v]:
            has_negative_cycle = True
            break

    return dist, parent, has_negative_cycle

def get_path(parent, start, end):
    """경로 복원"""
    if parent[end] == -1:
        return []

    path = []
    current = end
    while current != -1:
        path.append(current)
        current = parent[current]

    return path[::-1]

# 사용 예시
dist, parent, has_cycle = bellman_ford_with_path(1, n, edges)
path = get_path(parent, 1, n)
print(f"경로: {' → '.join(map(str, path))}")
```

## 구현 예시 (JavaScript)

```javascript
const INF = Infinity;

function bellmanFord(start, n, edges) {
  // 거리 테이블 초기화
  const dist = Array(n + 1).fill(INF);
  dist[start] = 0;

  // (V-1)번 반복
  for (let i = 0; i < n - 1; i++) {
    // 모든 간선 확인
    for (const [u, v, cost] of edges) {
      if (dist[u] !== INF && dist[u] + cost < dist[v]) {
        dist[v] = dist[u] + cost;
      }
    }
  }

  // 음수 사이클 확인
  let hasNegativeCycle = false;
  for (const [u, v, cost] of edges) {
    if (dist[u] !== INF && dist[u] + cost < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { dist, hasNegativeCycle };
}

// 사용 예시
const edges = [
  [1, 2, 4],
  [1, 3, 3],
  [2, 3, -1],
  [3, 4, 1],
];

const result = bellmanFord(1, 4, edges);
console.log(result.dist); // [Infinity, 0, 4, 3, 4]
```

## 실전 팁

> [!TIP]
>
> 1. **간선 리스트 형태**로 저장 (인접 리스트가 아닌)
> 2. **시작점에 도달 불가능한 정점**은 거리가 INF로 유지됨
> 3. **음수 사이클 판별**이 필요한 경우 V번째 반복에서 체크
> 4. **경로 복원**이 필요하면 parent 배열 사용
> 5. 정점이 많고 간선이 적다면 다익스트라가 더 효율적
