# [[BOJ] 후위 표기식](https://www.acmicpc.net/problem/1918)

> [자료 구조] [스택]

## 발상

스택을 써야 한다는 사실은 알았으나, 진짜 아무리 봐도 풀이법이 안보였다..

결국 나와있는 풀이를 보고 풀게 되었는데, 이런식으로도 스택 풀이법이 있을 수 있다는 것을 알고 넘어가자..

## <br>정답 코드

> _정답 코드 및 구현한 내용 중 설명한 부분이 있다면, 내용을 적어주세요._

```python
import sys
readline = sys.stdin.readline

stack = []
answer = ""
line = list(readline())

for i in line:
    if i.isalpha():
        answer += i
    if i == '(':
        stack.append(i)
    if i == '*' or i == '/':
        while stack and (stack[-1] == '*' or stack[-1] == '/'):
            answer += stack.pop()
        stack.append(i)
    if i == '+' or i == '-':
        while stack and stack[-1] != '(':
            answer += stack.pop()
        stack.append(i)
    if i == ')':
        while stack and stack[-1] != '(' :
            answer += stack.pop()
        stack.pop()

while stack:
    answer += stack.pop()

print(answer)
```
