# [[LeetCode] 841. Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)

## 발상

- 그냥 BFS로 풀면 되는 문제

## <br>정답 코드

```python
from collections import deque

class Solution(object):
    def canVisitAllRooms(self, rooms):
        roomLength = len(rooms)
        hasRoomVisited = [False] * roomLength
        hasRoomVisited[0] = True

        queue = deque([0])

        while queue:
            newKey = queue.popleft()

            for key in rooms[newKey]:
                if not hasRoomVisited[key]:
                    hasRoomVisited[key] = True
                    queue.append(key)

        for isVisited in hasRoomVisited:
            if not isVisited:
                return False

        return True
```
