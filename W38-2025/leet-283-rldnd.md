# [[LeetCode] 283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)

## 발상

- 간단하게 순회를 해서 0이 아닌 숫자들을 저장해놓고, 나중에 0을 채워넣는 방법이 있다.

## <br>정답 코드 1

- time complexity: O(n)
- space complexity: O(n)

```python
class Solution(object):
    def moveZeroes(self, nums):
        """
        :type nums: List[int]
        :rtype: None Do not return anything, modify nums in-place instead.
        """

        notZeroNumList = []
        for num in nums:
            if num:
                notZeroNumList.append(num)
        zeroCount = len(nums) - len(notZeroNumList)

        for i in range(len(notZeroNumList)):
            nums[i] = notZeroNumList[i]
        for i in range(len(notZeroNumList), len(notZeroNumList) + zeroCount):
            nums[i] = 0
```

## <br>정답 코드 2

- time complexity: O(n)
- space complexity: O(1)

```python
class Solution(object):
    def moveZeroes(self, nums):
        """
        :type nums: List[int]
        :rtype: None Do not return anything, modify nums in-place instead.
        """

        left = 0

        for right in range(len(nums)):
            if not nums[right] == 0:
                nums[right], nums[left] = nums[left], nums[right]
                left += 1
        return nums
```
