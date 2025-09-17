# [[LeetCode] 1. Two Sum](https://leetcode.com/problems/two-sum)

> [브루트포스]

## 발상

- 단순 브루트포스 풀이

## <br>정답 코드

```python
class Solution(object):
    def twoSum(self, nums, target):
        N = len(nums)

        for i in range(N):
            for j in range(N):
                if i == j:
                    continue
                if nums[i] + nums[j] == target:
                    return [i, j]
```
