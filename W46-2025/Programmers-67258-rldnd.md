# [[Programmers] 보석 쇼핑](https://school.programmers.co.kr/learn/courses/30/lessons/67258)

## 발상

- 딱봐도 투포인터 문제.
- 현재 가지고 있는 종류가 전체 종류와 같아질 때까지 오른쪽 포인터를 이동시키고, 같아지면 왼쪽 포인터를 이동시키면서 최소 구간을 갱신한다.

## <br>정답 코드

```js
// 현재 가지고 있는 종류가 작으면 right += 1 / 다 찼다면 left += 1

function solution(gems) {
  const variation = new Set(gems);
  const variationCount = variation.size;
  let shortestLength = Infinity;
  let answer;

  let left = 0;
  let right = 0;

  const currentHavingVariation = new Map();
  let currentHavingVariationCount = 1;

  Array.from(variation.keys()).forEach((key) => {
    currentHavingVariation.set(key, 0);
  });
  currentHavingVariation.set(gems[left], 1);

  while (left < gems.length && right < gems.length) {
    if (currentHavingVariationCount < variationCount) {
      if (right === gems.length - 1) break;

      right += 1;
      const count = currentHavingVariation.get(gems[right]);
      if (!count) {
        currentHavingVariationCount += 1;
      }
      currentHavingVariation.set(gems[right], count + 1);
      continue;
    }

    if (currentHavingVariationCount === variationCount) {
      if (right - left < shortestLength) {
        shortestLength = right - left;
        answer = [left, right];
      }
      const count = currentHavingVariation.get(gems[left]);
      if (count === 1) {
        currentHavingVariationCount -= 1;
      }
      currentHavingVariation.set(gems[left], count - 1);
      left += 1;
      continue;
    }
  }

  return answer.map((value) => value + 1);
}
```
