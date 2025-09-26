# [[LeetCode] 2390. Removing Stars From a String](https://leetcode.com/problems/removing-stars-from-a-string)

## 발상

- 스택을 사용하여 풀이.

## <br>정답 코드

> _정답 코드 및 구현한 내용 중 설명한 부분이 있다면, 내용을 적어주세요._

```python
STAR = "*"

class Solution(object):
    def removeStars(self, s):
        stack = []
        for char in s:
            if not char == STAR:
                stack.append(char)
            else:
                stack.pop()
        return ''.join(stack)
```
