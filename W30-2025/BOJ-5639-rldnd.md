# [[BOJ] 이진 검색 트리](https://www.acmicpc.net/problem/5639)

> [그래프 이론] [그래프 탐색] [트리] [재귀]

## 발상

- preorder, postorder를 재귀를 이용해 처리하자.

## <br>정답 코드

```python
import sys
sys.setrecursionlimit(10**6)
values = []
try:
    while True:
        line = input().strip()
        if not line:
            break
        values.append(int(line))
except EOFError:
    pass

point = 0

class Node:
    def __init__(self):
        self.value = None
        self.left = None
        self.right = None

    def build_from_preorder(self, min_val, max_val):
        global point

        if point >= len(values):
            return

        val = values[point]

        if val < min_val or val > max_val:
            return

        self.value = val
        point += 1

        self.left = Node()
        self.left.build_from_preorder(min_val, val)

        self.right = Node()
        self.right.build_from_preorder(val, max_val)

    def postorder(self):
        if self.value is None:
            return

        if self.left:
            self.left.postorder()

        if self.right:
            self.right.postorder()

        print(self.value)

if values:
    root = Node()
    root.build_from_preorder(0, 1000001)
    root.postorder()


```
