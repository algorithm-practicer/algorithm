# [[LeetCode] 1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree)

## 발상

- DFS를 사용하며 각 노드에서 루트 노드부터 현재 노드까지의 경로 상에서 가장 큰 값을 기록

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
        self.answer = 0

    def goodNodes(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """

        def dfs(node, maximum):
            if node.val >= maximum:
                maximum = node.val
                self.answer += 1

            if node.left:
                dfs(node.left, maximum)
            if node.right:
                dfs(node.right, maximum)

        dfs(root, root.val)
        return self.answer

```
