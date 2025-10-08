# [[Programmers] 코딩 테스트 공부](https://school.programmers.co.kr/learn/courses/30/lessons/118668)

## 발상

- 처음엔 그리디로 풀려 했으나, 문제의 조건을 만족하지 못하거나 시간초과가 발생

## <br> 틀린 풀이 코드 및 틀린 이유

- 코드가 더러움 + 시간초과

```python
NOT_ENABLED = -1
def solution(alp, cop, problems):
    N = len(problems)
    visited = [False] * N
    solvedCount = 0
    visitedCount = 0
    # [알고력, 코딩력, 시간]
    abilities = [[1, 0, 1], [0, 1, 1]]
    stack = []
    answer = 0

    while solvedCount < 2:
        # 현재 갈 수 있는 곳
        solveEnabledProblem = NOT_ENABLED

        # 갈 수 있는 곳이 있었을 경우
        if stack:
            solveEnabledProblem = stack.pop()

        # 갈 수 있는 곳이 없었을 경우
        for i in range(N):
            if visited[i]:
                continue

            # 갈 수 있는 경우
            if alp >= problems[i][0] and cop >= problems[i][1]:
                visited[i] = True

                if not solveEnabledProblem == NOT_ENABLED:
                    stack.append(i)
                else:
                    solveEnabledProblem = i

        while solveEnabledProblem == NOT_ENABLED:
            needTime = 1e9
            bestAbility = [0,0,1e9]
            targetI = -1

            for i in range(N):
                if visited[i]:
                    continue
                needAlp, needCop = problems[i][0], problems[i][1]

                for upAlp, upCop, upTime in abilities:
                    if alp + upAlp >= needAlp and cop + upCop >= needCop:
                        needTime = min(needTime, upTime)
                        bestAbility = [upAlp, upCop, upTime]
                        targetI = i
                    elif ((needAlp - upAlp) / upTime > (needAlp - bestAbility[0]) / bestAbility[2]) or ((needCop - upCop) / upTime > (needCop - bestAbility[1]) / bestAbility[2]):
                        needTime = min(needTime, upTime)
                        bestAbility = [upAlp, upCop, upTime]
                        targetI = i
            alp += bestAbility[0]
            cop += bestAbility[1]
            answer += bestAbility[2]

            if alp >= problems[targetI][0] and cop >= problems[targetI][1]:
                solveEnabledProblem = targetI
                visited[targetI] = True
        solvedCount += 1
        abilities.append(problems[solveEnabledProblem][2:])
        alp += problems[solveEnabledProblem][2]
        cop += problems[solveEnabledProblem][3]
        answer += problems[solveEnabledProblem][4]

    return answer
```

## <br>정답 코드

- dijkstra로 처리. distance 테이블을 문제 번호 기준이 아닌, 능력치 기준으로 이중 테이블을 사용해 처리

```python
import heapq

def solution(alp, cop, problems):
    maxAlp = max(p[0] for p in problems)
    maxCop = max(p[1] for p in problems)

    alp = min(alp, maxAlp)
    cop = min(cop, maxCop)

    if alp >= maxAlp and cop >= maxCop:
        return 0

    INF = float(1e9)

    timeTable = [[INF] * (maxCop + 1) for _ in range(maxAlp + 1)]
    timeTable[alp][cop] = 0

    pq = [(0, alp, cop)]

    while pq:
        time, currentAlp, currentCop = heapq.heappop(pq)

        if currentAlp >= maxAlp and currentCop >= maxCop:
            return time

        if time > timeTable[currentAlp][currentCop]:
            continue

        if currentAlp < maxAlp:
            nextAlp = currentAlp + 1
            if timeTable[nextAlp][currentCop] > time + 1:
                timeTable[nextAlp][currentCop] = time + 1
                heapq.heappush(pq, (time + 1, nextAlp, currentCop))

        if currentCop < maxCop:
            nextCop = currentCop + 1
            if timeTable[currentAlp][nextCop] > time + 1:
                timeTable[currentAlp][nextCop] = time + 1
                heapq.heappush(pq, (time + 1, currentAlp, nextCop))

        for needAlp, needCop, upAlp, upCop, upTime in problems:
            if currentAlp >= needAlp and currentCop >= needCop:
                nextAlp = min(currentAlp + upAlp, maxAlp)
                nextCop = min(currentCop + upCop, maxCop)

                if timeTable[nextAlp][nextCop] > time + upTime:
                    timeTable[nextAlp][nextCop] = time + upTime
                    heapq.heappush(pq, (time + upTime, nextAlp, nextCop))

    return timeTable[maxAlp][maxCop]
```
