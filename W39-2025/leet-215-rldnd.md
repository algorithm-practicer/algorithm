# [[LeetCode] 215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

## 발상

- 정렬을 해놓고 처리할 수도 있고, 힙을 사용할 수도 있음.
- 정렬의 경우는 O(N log N), 힙의 경우는 O(N log K)로 힙이 더 효율적.

## <br>정답 코드

```python
import heapq

class Solution(object):
    def findKthLargest(self, nums, k):
        minusNums = list(map(lambda x: -x, nums))
        maxHeap = heapq.heapify(minusNums)

        for _ in range(k - 1):
            heapq.heappop(minusNums)

        return heapq.heappop(minusNums) * -1
```
