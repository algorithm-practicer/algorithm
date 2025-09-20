# [[Programmers] 가장 많이 받은 선물](https://school.programmers.co.kr/learn/courses/30/lessons/258712)

## 발상

- 말그대로 구현하면 될듯

## <br>정답 코드

```python
"""
선물 지수: 이번달까지 자신이 준 수 - 받은 수

두 사람이 기록이 있다면: 이번달까지 더 많은 선물 준 사람이 하나 받음
기록이 없거나, 주고받은게 같다면: 선물 지수가 큰 사람이 받음 / 선물지수도 같다면 나누지 않음

선물을 가장 많이 받는 사람의 선물의 수
"""

def solution(friends, gifts):
    friendsLength = len(friends)
    friendToIndexMapper = dict()

    friendRadix = [0] * friendsLength
    giftCountTable = [[0] * friendsLength for _ in range(friendsLength)]
    nextMonthGiftCount = [0] * friendsLength

    for index in range(friendsLength):
        friendToIndexMapper[friends[index]] = index

    for gift in gifts:
        fromFriend, toFriend = gift.split(' ')
        fromFriendIndex = friendToIndexMapper[fromFriend]
        toFriendIndex = friendToIndexMapper[toFriend]
        friendRadix[fromFriendIndex] += 1
        friendRadix[toFriendIndex] -= 1
        giftCountTable[fromFriendIndex][toFriendIndex] += 1

    for i in range(friendsLength - 1):
        for j in range(i + 1, friendsLength):
            # 기록이 있으면서 서로 준 기록이 다름
            if (giftCountTable[i][j] or giftCountTable[j][i]) and not giftCountTable[i][j] == giftCountTable[j][i]:
                if giftCountTable[i][j] > giftCountTable[j][i]:
                    nextMonthGiftCount[i] += 1
                else:
                    nextMonthGiftCount[j] += 1
            # 기록이 있지만 서로 주고받은게 같거나, 기록이 없는 경우
            else:
                if friendRadix[i] > friendRadix[j]:
                    nextMonthGiftCount[i] += 1
                elif friendRadix[i] < friendRadix[j]:
                    nextMonthGiftCount[j] += 1

    return max(nextMonthGiftCount)
```
