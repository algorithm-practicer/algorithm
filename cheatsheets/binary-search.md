# 이분탐색

> [!important]
>
> `정렬되어 있는 배열`에서 특정 데이터를 찾기 위해 모든 데이터를
>
> 순차적으로 확인하는 대신 `탐색 범위를 절반`으로 줄여가며 찾는 탐색 방법

-> 선형 탐색은 O(N)으로 동작하고, 이분 탐색은 O(logN)에 동작

## bisect_left

```python
def bisect_left(target, array):
  left, right = 0, len(array)-1
  while left <= right:
      mid = (left + right) // 2
      if array[mid] < target:
          left = mid + 1
      else:
          right = mid - 1
  return left
```

- 값이 리스트에 있을 때
  - left: 타겟 값이 처음 등장하는 인덱스를 반환 ( 제일 왼 쪽 )
- 값이 리스트에 없을 때
  - 리스트 오름차순에 들어갈 index 반환 ~~원래 여기에 있어야 하는데?~~

## bisect_right

```python
def bisect_right(target, array):
  left, right = 0, len(array)
  while left < right:
      mid = (left + right) // 2
      if array[mid] <= target:
          left = mid + 1
      else:
          right = mid
  return left
```

- 값이 리스트에 있을 때
  - 타겟 값이 마지막으로 등장하는 인덱스 + 1을 반환 (삽입 위치)
- 값이 리스트에 없을 때
  - 타겟이 삽입될 위치를 반환 (target보다 큰 첫 번째 원소의 인덱스)

## 정확히 찾아보기

-> bisect_left의 if문과 bisect_right의 if문을 같이 사용하면 됨.

```python
while left <= right:
  mid = (left + right) // 2
  if array[mid] < target:
    left = mid + 1
  elif array[mid] > target:
    right = mid - 1
  else:
    # 정답!
```
