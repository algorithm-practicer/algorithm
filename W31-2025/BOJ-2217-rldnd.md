# [[BOJ] 로프](https://www.acmicpc.net/problem/2217)

> [수학] [그리디 알고리즘] [정렬]

## 발상

- 아무리 생각해봐도 로프를 강한 것부터 쓰는게 이득.
- 길이가 다르다는 조건으로 인해 무조건 최대 가용 무게는 제일 약한 로프에 의해 결정된다.

## <br>정답 코드

```python
import sys
readline = sys.stdin.readline

N = int(readline())
lst = sorted([int(readline()) for _ in range(N)], key = lambda x: -x)
answer = -1
count = 0

for i in lst:
    count += 1
    answer = max(i * count, answer)

print(answer)
```
