# [[BOJ] IOIOI](https://www.acmicpc.net/problem/5525)

> [문자열]

## 발상

- 2중 반복문이 필요한 내용같이 보이지만, 필요한 시간복잡도를 봤을 때 투포인터를 써야겠구나.

## <br>[Optional] 틀린 풀이 코드 및 틀린 이유

- 50점이 나옴

```python
import sys
readline = sys.stdin.readline

N = int(readline())
S_length = int(readline())
S = readline()

s, e = 0, 0
need_check_count = N * 2 + 1
check_count = 0
answer = 0

I = ['I', 'O']

"""
시간복잡도 O(NlogN)
"""

while s <= e and s < S_length and e < S_length:
    if not S[e] == I[(e - s) % 2]:
        s += 1
        e = s
        check_count = 0
        continue
    e += 1
    check_count += 1
    if need_check_count == check_count:
        s += 1
        e = s
        answer += 1
        check_count = 0

print(answer)
```

## <br>정답 코드

- 해당 방식은 문자열을 한 번만 순회하는, O(N)의 시간복잡도를 가진다.
- 왜 이생각은 못했지...?

```python
import sys
readline = sys.stdin.readline

N = int(readline())
S_length = int(readline())
S = readline().strip()

answer = 0
i = 0

while i < S_length - 1:
    if S[i] == 'I' and S[i + 1] == 'O':
        pattern_count = 0

        while i + 2 < S_length and S[i + 1] == 'O' and S[i + 2] == 'I':
            pattern_count += 1
            i += 2

            if pattern_count >= N:
                answer += 1
        i += 1
    else:
        i += 1

print(answer)
```
