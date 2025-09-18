# [[LeetCode] 643. Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)

> [Sliding Window]

## 발상

- 브루트포스로 처리할 시 시간복잡도: O(N \* K)
- 슬라이딩 윈도우로 처리할 시 시간복잡도: O(N)
  - k 길이의 윈도우를 오른쪽으로 한 칸씩 이동시키며, 맨 앞의 값을 빼고 맨 뒤의 값을 더하는 방식으로 합을 갱신
  - 매 이동마다 최대 합을 갱신

## <br>정답 코드

```python
class Solution(object):
    def findMaxAverage(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: float
        """

        summation = sum(nums[0:k])
        maxSummation = summation

        if len(nums) == 1:
            return round(float(maxSummation) / k, 5)

        for start in range(1, len(nums) - k + 1):
            summation = summation - nums[start - 1] + nums[start + k - 1]
            maxSummation = max(summation, maxSummation)
        return round(float(maxSummation) / k, 5)

```
