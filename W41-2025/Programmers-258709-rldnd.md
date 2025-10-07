# [[Programmers] 주사위 고르기](https://school.programmers.co.kr/learn/courses/30/lessons/258709)

## 발상

- 백트래킹을 두번 사용.

## <br> 틀린 풀이 코드 및 틀린 이유

- 내가 고른 주사위와 상대가 고른 주사위를 한번에 처리하기 때문에 시간복잡도가 초과해버림.
- 따라서, 내가 고른 주사위의 점수, 상대가 고른 주사위의 점수를 따로 계산해줘야함.

```python
def solution(dice):
    diceLength = len(dice)
    gottenDiceLength = diceLength // 2
    used = [False] * diceLength
    used[0] = True
    result = 0
    oppositeResult = 0
    answer = 0
    answerDice = []

    def calculateBackTracking(selected, index, myDice):
        nonlocal result, oppositeResult

        if index == diceLength:
            myScore, oppositeScore = 0, 0

            for i in range(diceLength):
                if myDice[i]:
                    myScore += selected[i]
                else:
                    oppositeScore += selected[i]

            if myScore > oppositeScore:
                result += 1
            if myScore < oppositeScore:
                oppositeResult += 1
            return
        for i in range(6):
            selected.append(dice[index][i])
            calculateBackTracking(selected, index + 1, myDice)
            selected.pop()

    def backTracking(gotten, usedLength):
        nonlocal result, oppositeResult, answer, answerDice

        if usedLength == gottenDiceLength:
            myDice = dict()
            for i in range(diceLength):
                if used[i]:
                    myDice[i] = True
                else:
                    myDice[i] = False

            calculateBackTracking([], 0, myDice)
            if answer < result:
                answer = result
                answerDice = []
                for i in range(diceLength):
                    if used[i]:
                        answerDice.append(i + 1)
            if answer < oppositeResult:
                answer = oppositeResult
                answerDice = []
                for i in range(diceLength):
                    if not used[i]:
                        answerDice.append(i + 1)
            result = 0
            oppositeResult = 0
            return

        for i in range(gotten + 1, diceLength - gottenDiceLength + usedLength + 1):
            used[i] = True
            backTracking(i, usedLength + 1)
            used[i] = False

    backTracking(0, 1)

    return answerDice
```

## <br>정답 코드

```python
def solution(dice):
    diceLength = len(dice)
    gottenDiceLength = diceLength // 2
    used = [False] * diceLength
    resultList = []
    oppositeResultList = []
    answer = 0
    answerDice = []

    def calculateMineBackTracking(selected, index, myDice):
        if len(selected) == gottenDiceLength:
            resultList.append(sum(selected))
            return

        for i in range(6):
            selected.append(dice[myDice[index]][i])
            calculateMineBackTracking(selected, index + 1, myDice)
            selected.pop()

    def calculateOppositeBackTracking(selected, index, myDice):
        if len(selected) == gottenDiceLength:
            oppositeResultList.append(sum(selected))
            return

        for i in range(6):
            selected.append(dice[myDice[index]][i])
            calculateOppositeBackTracking(selected, index + 1, myDice)
            selected.pop()

    def bisectLeft(arr, target):
        left, right = 0, len(arr) - 1

        while left <= right:
            mid = (left + right) // 2
            if arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left

    def backTracking(gotten, usedLength):
        nonlocal answer, answerDice, resultList, oppositeResultList

        if usedLength == gottenDiceLength:
            myDice = []
            oppositeDice = []
            for i in range(diceLength):
                if used[i]:
                    myDice.append(i)
                else:
                    oppositeDice.append(i)

            calculateMineBackTracking([], 0, myDice)
            calculateOppositeBackTracking([], 0, oppositeDice)
            result = 0

            resultList.sort(key = lambda x: x)
            oppositeResultList.sort(key = lambda x: x)

            for r in resultList:
                result += bisectLeft(oppositeResultList, r)

            if answer < result:
                answer = result
                answerDice = list(map(lambda x: x + 1, myDice))
            resultList = []
            oppositeResultList = []
            return

        for i in range(gotten + 1, diceLength - gottenDiceLength + usedLength + 1):
            used[i] = True
            backTracking(i, usedLength + 1)
            used[i] = False

    backTracking(-1, 0)

    return answerDice
```
