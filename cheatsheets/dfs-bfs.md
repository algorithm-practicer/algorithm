# DFS, BFS

## BFS

> [!important]
>
> 다차원 배열에서 각 칸을 방문할 때 너비를 우선으로 방문하는 알고리즘

### 구현 방식

1. 시작하는 칸을 큐에 넣고 방문했다는 표시를 남김
2. 큐에서 원소를 꺼내어 그 칸에 상하좌우로 인접한 칸에 대해 3번을 진행
3. 해당 칸을 이전에 방문했다면 아무 것도 하지 않고, 처음으로 방문했다면 방문했다는 표시를 남기고 해당 칸을 큐에 삽입
4. 큐가 빌 때 까지 2번을 반복

### 사용되는 경우

- 최단거리로 방문해야하는 경우
- 길찾기 문제
- 경우의 수를 조회하는 방법 ( 큐나 스택에 정보를 같이 넣어주는 방법 )

### 유의할 점

1. 시작점에 방문했다는 표시를 남겨야 한다.
2. 큐에 넣을 때 방문했다는 표시를 해야한다.

## DFS

> [!important]
>
> 다차원 배열에서 각 칸을 방문할 때 깊이를 우선으로 방문하는 알고리즘

### 구현 방식 - 스택

1. 시작하는 칸을 스택에 넣고 방문했다는 표시를 남김
2. 스택에서 원소를 꺼내어 그 칸과 상하좌우로 인접한 칸에 대해 3번을 진행
3. 해당 칸을 이전에 방문했다면 아무 것도 하지 않고, 처음으로 방문했다면 방문했다는 표시를 남기고 해당 칸을 스택에 삽입
4. 스택이 빌 때 까지 2번을 반복

### 구현 방식 - 재귀

1. 시작하는 칸을 방문했다는 표시를 남김
2. 현재 칸과 상하좌우로 인접한 칸에 대해 3번을 진행
3. 해당 칸을 이전에 방문했다면 아무 것도 하지 않고, 처음으로 방문했다면 방문했다는 표시를 남기고 해당 칸에 대해 2번을 재귀적으로 호출
4. 모든 칸을 방문할 때까지 2번을 반복

### 사용되는 경우

- 처음부터 끝까지 방문을 일단 먼저해야하는 경우
- 길찾기 문제
- 경우의 수를 조회하는 방법 ( 큐나 스택에 정보를 같이 넣어주는 방법 )

> [!TIP]
> 재귀함수를 사용하는 경우, 탈출 조건을 정해두자. ( 그렇지 않으면 full search를 하기 때문에 시간초과가 나는 경우가 있음 )
