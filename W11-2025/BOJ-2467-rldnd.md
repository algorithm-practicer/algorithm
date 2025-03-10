# [[BOJ] 용액](https://www.acmicpc.net/problem/2467)

> [이분 탐색] [두 포인터]

## 발상

- 이거 단순하게 풀면 O(N^2) 나오는데, 시간복잡도가 O(NlogN)을 요함.
- 투포인터 형식으로 풀거나, 투포인터 문제의 대부분은 이분탐색으로도 풀 수 있을것
- 양 끝을 커서로 잡고, 조건을 잘 확인해보면 될듯..?

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N = int(readline())
A = sorted(list(map(int, readline().split())))

s, e = 0, N - 1

answer = A[s] + A[e]
answer_s, answer_e = s, e

while s < e:
    start, end = A[s], A[e]
    local_answer = start + end
    if abs(local_answer) < abs(answer):
        answer_s, answer_e = s, e
        answer = local_answer
    if local_answer < 0:
        s += 1
    elif local_answer > 0:
        e -= 1
    else:
        break

print(A[answer_s], A[answer_e])
```
