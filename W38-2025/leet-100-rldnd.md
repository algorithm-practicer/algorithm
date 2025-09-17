# [[LeetCode] 100. Same Tree](https://leetcode.com/problems/same-tree/)

## 발상

- 재귀로 하나하나 비교하자.

## <br>정답 코드

- 재귀 방식의 문제 풀이

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isSameTree(self, p, q):
        def check_is_same_value(a, b):
            if not a and not b:
                return True
            if not a or not b:
                return False
            return (a.val == b.val and check_is_same_value(a.left, b.left) and check_is_same_value(a.right, b.right))

        return check_is_same_value(p, q)

```
