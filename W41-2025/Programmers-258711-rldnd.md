# [[Programmers] 도넛과 막대 그래프](https://school.programmers.co.kr/learn/courses/30/lessons/258711)

## 발상

- 정점의 indegree / outdegree의 수를 파악하여 문제를 해결
- 추가로 DFS를 사용하여 도넛과 8자를 구분

## <br>틀린 풀이 코드 및 틀린 이유

- 완전하게 처리가 되지 않음

```python
"""
DFS O(V + E)
1 <= edges <= 1_000_000
1 <= a, b <= 1_000_000

answer
[생성한 정점 번호, 도넛 개수, 막대 개수, 8자 개수]

도넛: outdegree가 1, indegree가 1
8자: indegree가 2, outdegree가 2
생성한 정점: outdegree 2 이상 + indegree가 0

생성한 정점을 무시한다고 할 때, 막대의 경우 시작점은 indegree가 0
"""

MAX = 1_000_000

def solution(edges):
    visited = [False] * (MAX + 1)
    adj = [[] for _ in range(MAX + 1)]
    indegree = [0] * (MAX + 1)
    outdegree = [0] * (MAX + 1)
    hasVertex = dict()
    createdVertex = -1
    donut = 0
    line = 0
    eight = 0

    def dfs(v, startPoint):
        nonlocal donut, eight

        for nextPoint in adj[v]:
            if visited[nextPoint]:
                if outdegree[v] == 2:
                    continue
                if nextPoint == startPoint:
                    donut += 1
                    return
                if outdegree[nextPoint] == 2:
                    eight += 1
                    return
            else:
                visited[nextPoint] = True
                dfs(nextPoint, startPoint)


    for f, t in edges:
        hasVertex[f] = True
        hasVertex[t] = True
        adj[f].append(t)
        indegree[t] += 1
        outdegree[f] += 1

    # 생성한 정점 구하기
    for v in range(MAX + 1):
        if not indegree[v] and outdegree[v] >= 2:
            createdVertex = v
            visited[v] = True

            for toVertex in adj[v]:
                indegree[toVertex] -= 1
            break

    # 정점 순회
    for v in range(1, MAX + 1):
        if visited[v]:
            continue

        if not outdegree[v] == 2 and v in hasVertex:
            visited[v] = True
            if not indegree[v]:
                line += 1

            if adj[v]:
                dfs(v, v)

    return [createdVertex, donut, line, eight]
```

## <br>정답 코드

- indegree / outdegree의 수만 따져서 처리가 가능

```python
"""
DFS O(V + E)
1 <= edges <= 1_000_000
1 <= a, b <= 1_000_000

answer
[생성한 정점 번호, 도넛 개수, 막대 개수, 8자 개수]

막대: indegree 0 outdegree 0 / indegree 1 outdegree 1 / indegree 1 outdegree 0 / indegree 0 outdegree 1
도넛: indegree 1 outdegree 1
8자: indegree 2 outdegree 2 / indegree 1 outdegree 1
정점: indegree 0 outdegree 2+
"""

MAX = 1_000_000

def solution(edges):
    maxVertex = -1
    indegree = [0] * (MAX + 1)
    outdegree = [0] * (MAX + 1)
    answer = [0, 0, 0, 0]
    hasVertex = dict()

    for fromVertex, toVertex in edges:
        maxVertex = max(maxVertex, fromVertex, toVertex)
        indegree[toVertex] += 1
        outdegree[fromVertex] += 1
        hasVertex[fromVertex] = True
        hasVertex[toVertex] = True

    for i in range(1, maxVertex + 1):
        if not indegree[i] and outdegree[i] >= 2:
            answer[0] = i

            for fromVertex, toVertex in edges:
                if fromVertex == i:
                    indegree[toVertex] -= 1
            break

    for i in range(1, maxVertex + 1):
        if not i in hasVertex:
            continue
        if i == answer[0]:
            continue
        if indegree[i] == 2 and outdegree[i] == 2:
            answer[3] += 1
            continue
        if (not indegree[i] and not outdegree[i]) or (indegree[i] == 1 and not outdegree[i]):
            answer[2] += 1
            continue

    answer[1] = outdegree[answer[0]] - answer[3] - answer[2]

    return answer
```
