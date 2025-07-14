# [[BOJ] 색종이 만들기](https://www.acmicpc.net/problem/2630)

> [분할정복] [재귀]

## 발상

- 가능한 시간복잡도는 O(N^3)으로 보이는데, 재귀를 사용해서 O(N^2logN) 정도로 해결이 가능해보임

## <br>정답 코드

```python
"""
시간복잡도: O(N^2logN)
"""

import sys
readline = sys.stdin.readline

WHITE, BLUE = '0', '1'
white, blue = 0, 0

N = int(readline())
X = []
for i in range(N):
    line = list(readline().rstrip().split())
    X.append(line)

def dfs_check_same_color(row, col, size, target_color):
    if row < 0 or row >= N or col < 0 or col >= N:
        return True
    if row >= row + size or col >= col + size:
        return True
    if X[row][col] != target_color:
        return False


    for i in range(row, row + size):
        for j in range(col, col + size):
            if X[i][j] != target_color:
                return False
    return True

def divide_conquer(row, col, size):
    global white, blue

    if dfs_check_same_color(row, col, size, X[row][col]):
        if X[row][col] == WHITE:
            white += 1
        else:
            blue += 1
        return


    half = size // 2
    divide_conquer(row, col, half)
    divide_conquer(row, col + half, half)
    divide_conquer(row + half, col, half)
    divide_conquer(row + half, col + half, half)

divide_conquer(0, 0, N)
print(white)
print(blue)
```
