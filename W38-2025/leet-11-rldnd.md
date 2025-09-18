# [[LeetCode] 11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

> [Two pointers]

## 발상

- 브루트포스를 사용해서도 구현은 가능하다. 하지만 O(n^2)의 시간복잡도를 가지게 된다.
- 투 포인터를 사용해서 구현할 수 있다.
- 양 끝에서 시작해서, 더 작은 쪽의 포인터를 안쪽으로 이동시키면서 최대 넓이를 갱신한다.
- 이 때, 더 작은 쪽의 포인터를 이동시키는 이유는, 넓이는 더 작은 쪽의 높이에 의해 결정되기 때문이다.
- 따라서, 더 작은 쪽의 포인터를 이동시켜서 더 큰 높이를 찾을 수 있는 가능성을 열어두는 것이다.

## <br>정답 코드

```python
class Solution(object):
    def maxArea(self, height):
        """
        :type height: List[int]
        :rtype: int
        """

        answer = 0
        left, right = 0, len(height) - 1

        while left < right:
            answer = max(min(height[left], height[right]) * (right - left), answer)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return answer
```
