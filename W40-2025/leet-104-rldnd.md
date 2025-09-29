# [[LeetCode] 104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

## 발상

- DFS를 통해 깊이를 구함

## <br>정답 코드

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def __init__(self):
        self.answer = 1

    def maxDepth(self, root):
        def dfs(node, count):
            if node == None:
                self.answer = 0
                return

            if node.left == None and node.right == None:
                self.answer = max(self.answer, count)
                return

            if node.left:
                dfs(node.left, count + 1)
            if node.right:
                dfs(node.right, count + 1)

        dfs(root, 1)

        return self.answer


```
