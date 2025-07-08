# [[BOJ] 감소하는 수](https://www.acmicpc.net/problem/1038)

> [브루트포스 알고리즘] [백트래킹]

## 발상

- 시간복잡도가 O(NlogN) 정도로 필요함.
- 2중 for문을 생각했다가, 차라리 백트래킹을 이용해서 모든 경우의 수를 구하는 것이 더 빠를 것 같다는 생각이 들었음

## <br> 틀린 풀이 코드 및 틀린 이유

- back_tracking을 여러번 호출하게 되어 오히려 시간복잡도가 올라감.

```python
import sys
readline = sys.stdin.readline

N = int(readline())
answer_list = []
used = [False] * 10

def back_tracking(length, depth, number, answer):
    global answer_list, used

    if length == depth:
        answer_list.append(answer)
        return

    for i in range(number):
        if not used[i]:
            used[i] = True
            back_tracking(length, depth + 1, i, f'{answer}{i}')
            used[i] = False

back_tracking(1, 0, 10, "")

if N > 1023:
    print(-1)
    exit()

length = 2
while len(answer_list) <= N:
    back_tracking(length, 0, 10, "")
    length += 1

if len(answer_list) > N:
    print(answer_list[N])
else:
    print(-1)
```

## <br>정답 코드

- 차라리 백트래킹을 통해 모든 경우의 수를 처리하고, 정렬의 경우 O(NlogN)의 시간복잡도이기 때문에 이를 사용해도 상관없겠다고 생각

```python
import sys
readline = sys.stdin.readline

N = int(readline())
answer_list = []
used = [False] * 10

def back_tracking(length, number, answer):
    global answer_list, used

    if answer:
        answer_list.append(int(answer))

    for i in range(number):
        if not used[i]:
            used[i] = True
            back_tracking(length, i, f'{answer}{i}')
            used[i] = False

back_tracking(1, 10, "")

answer_list.sort(key = lambda x: x)

if N > 1023:
    print(-1)
    exit()

if len(answer_list) > N:
    print(answer_list[N])
else:
    print(-1)
```
