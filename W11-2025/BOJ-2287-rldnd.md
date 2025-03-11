# [[BOJ] 4와 7](https://www.acmicpc.net/problem/2877)

> [수학] [구현]

## 발상

- 2진수 형태랑 되게 비슷해보여서, 그걸 이용해봐야겠다.

## <br>정답 코드

- bin 이라는 2진수 변환 함수가 있구나

```python
import sys
readline = sys.stdin.readline

K = int(readline()) - 1
unit = 2
times = 1

while True:
    if K < unit:
        break
    else:
        K -= unit
        unit *= 2
        times += 1

answer = str(bin(K))[2:].rjust(times, '0')

for i in answer:
    if i == '0':
        print(4, end = '')
    else:
        print(7, end = '')


```
