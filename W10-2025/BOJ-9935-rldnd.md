# [[BOJ] 문자열 폭발](https://www.acmicpc.net/problem/9935)

> [자료 구조] [문자열] [스택]

## 발상

- 스택을 사용하면서 맨 뒷부분이 지워야 하는 단어라면 pop 시켜버리기.
- 뭔가 동작하는 방식이 투포인터랑 비슷해보이는..?

## <br>정답 코드

```python
import sys
from collections import deque
readline = sys.stdin.readline

line = deque(list(readline().rstrip()))
bomb = list(readline().rstrip())
answer = []

while line:
    answer.append(line.popleft())
    if len(answer) >= len(bomb) and answer[len(answer) - len(bomb):] == bomb:
        for _ in bomb:
            answer.pop()

print(''.join(answer)) if answer else print('FRULA')

```
