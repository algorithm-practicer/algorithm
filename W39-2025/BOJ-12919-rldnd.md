# [[BOJ] {문제이름}](https://www.acmicpc.net/problem/12919)

> [문자열] [브루트포스 알고리즘] [재귀]

## 발상

- BFS 혹은 DFS로 접근할 수 있다고 판단.

## <br> 틀린 풀이 코드 및 틀린 이유

- 메모리 초과
- 아무래도 visited를 사용하고 있어서 그런 듯 하다.

```python
import sys
from collections import deque
readline = sys.stdin.readline

ADD_METHOD, CHANGE_METHOD = 0, 1
MAX_LENGTH = 50

S = readline().rstrip()
T = readline().rstrip()

visited = dict()
queue = deque([S])
visited[S] = True

def processValue(method, value):
    if method == ADD_METHOD:
        result =  value + 'A'
        return result
    else:
        result = value + 'B'
        return result[::-1]

while queue:
    value = queue.popleft()
    if value == T:
        print(1)
        exit()

    for method in (ADD_METHOD, CHANGE_METHOD):
        nextValue = processValue(method, value)
        if not nextValue in visited and len(nextValue) <= len(T):
            visited[nextValue] = True
            queue.append(nextValue)

print(0)
```

## <br>정답 코드

- 시작점에서 도착점으로 가는 것이 아니라, 도착점에서 시작점으로 가는 방식으로 풀이.
- 도착점에서 시작점으로 가는 경우가 A 혹은 B가 존재하는지에 따라 가지치기가 되기 때문에 훨씬 효율적

```python
import sys
from collections import deque
readline = sys.stdin.readline

ADD_METHOD, CHANGE_METHOD = 0, 1

S = readline().rstrip()
T = readline().rstrip()

queue = deque([T])

def isMethodEnabled(method, value):
    if method == ADD_METHOD:
        return value[-1] == 'A'
    else:
        return value[0] == 'B'

def processValue(method, value):
    if method == ADD_METHOD:
        return value[:-1]
    else:
        return value[::-1][:-1]

while queue:
    value = queue.popleft()
    if value == S:
        print(1)
        exit()

    if len(value) <= 1:
        continue

    for method in (ADD_METHOD, CHANGE_METHOD):
        if isMethodEnabled(method, value):
            nextValue = processValue(method, value)
            if len(nextValue) > 0:
                queue.append(nextValue)

print(0)
```
