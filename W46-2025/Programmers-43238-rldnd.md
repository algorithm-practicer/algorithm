# [[Programmers] 입국심사](https://school.programmers.co.kr/learn/courses/30/lessons/43238)

## 발상

- Parametric search

## <br>정답 코드

```js
function solution(n, times) {
  let left = 1;
  let right = Math.max(...times) * n;
  times.sort((a, b) => a - b);

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    let value = 0;
    for (const time of times) {
      value += Math.floor(mid / time);
    }

    if (value < n) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
```
