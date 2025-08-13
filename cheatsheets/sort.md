# 정렬 (Sorting)

## Bubble Sort

- Bubble Sort는 인접한 두 원소를 비교하여 정렬하는 가장 간단한 정렬 알고리즘
  - 시간 복잡도: O(n^2)

## Merge Sort

- 길이가 N, M인 두 정렬된 리스트를 합쳐서 길이 N+M의 정렬된 리스트를 만드는 방법을 알아야 한다.
  - 두 리스트의 가장 작은 값끼리 비교해서 새로운 배열에 집어넣기 반복

> [!NOTE]
>
> 시간복잡도: O(N log N)

### 구현 방식

- 주어진 리스트를 2개로 나눈다.
- 나눈 리스트 2개를 정렬한다.
  - 각 리스트를 재귀적으로 Merge Sort를 이용해 정렬한다.
- 정렬된 두 리스트를 합친다.

### 코드

```py
def merge_sort(arr):
    if len(arr) < 2:
        return arr

    mid = len(arr) // 2
    low_arr = merge_sort(arr[:mid])
    high_arr = merge_sort(arr[mid:])

    merged_arr = []
    l = h = 0
    while l < len(low_arr) and h < len(high_arr):
        if low_arr[l] < high_arr[h]:
            merged_arr.append(low_arr[l])
            l += 1
        else:
            merged_arr.append(high_arr[h])
            h += 1
    merged_arr += low_arr[l:]
    merged_arr += high_arr[h:]
    return merged_arr
```

### 최적화 코드

```py
def merge_sort(arr):
    def sort(low, high):
        if high - low < 2:
            return
        mid = (low + high) // 2
        sort(low, mid)
        sort(mid, high)
        merge(low, mid, high)

    def merge(low, mid, high):
        temp = []
        l, h = low, mid

        while l < mid and h < high:
            if arr[l] < arr[h]:
                temp.append(arr[l])
                l += 1
            else:
                temp.append(arr[h])
                h += 1

        while l < mid:
            temp.append(arr[l])
            l += 1
        while h < high:
            temp.append(arr[h])
            h += 1

        for i in range(low, high):
            arr[i] = temp[i - low]

    return sort(0, len(arr))
```
