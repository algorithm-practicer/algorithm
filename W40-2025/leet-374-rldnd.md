# [[LeetCode] 374. Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower/)

## 발상

- 이분 탐색 사용

## <br>정답 코드

```python
# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num):

class Solution(object):
    def guessNumber(self, n):
        """
        :type n: int
        :rtype: int
        """

        def bisectLeft():
            left, right = 1, n
            while left <= right:
                mid = (left + right) // 2
                guessedValue = guess(mid)
                if guessedValue == 1:
                    left = mid + 1
                elif guessedValue == -1:
                    right = mid - 1
                else:
                    return mid
            return left

        return bisectLeft()

```
