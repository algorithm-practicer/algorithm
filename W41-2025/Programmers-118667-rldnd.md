# [[Programmers] 두 큐 합 같게 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/118667)

## 발상

- 슬라이딩 윈도우 식으로 풀면 될듯

## <br>정답 코드

```python
"""
종료 조건: left > right or left >= len(queue) or right >= len(queue)
1. 현재 window가 goal보다 작다면 right += 1 / answer += 1 / window += queue[right]
2. 현재 window가 goal보다 크다면 window -= queue[left] / left += 1 / answer += 1
"""
def solution(queue1, queue2):
    # 전체 queue
    queue = [*queue1, *queue2]
    # 합이 되어야 하는 값
    goal = int(sum(queue1) / 2 + sum(queue2) / 2)
    # 수행 횟수
    answer = 0
    # 답 유무
    hasAnswer = False
    # left: queue의 head / right: queue의 tail / window: sum(queue[left:right + 1])
    left, right, window = 0, len(queue1) - 1, sum(queue1)

    while left <= right and left < len(queue) and right < len(queue) - 1:
        if window < goal:
            right += 1
            answer += 1
            window += queue[right]
            continue

        if window > goal:
            window -= queue[left]
            left += 1
            answer += 1
            continue

        if window == goal:
            hasAnswer = True
            break

    return answer if hasAnswer else -1
```
