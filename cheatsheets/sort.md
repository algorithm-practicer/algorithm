# 정렬 (Sorting)

## Bubble Sort

- Bubble Sort는 인접한 두 원소를 비교하여 정렬하는 가장 간단한 정렬 알고리즘
  - 시간 복잡도: O(n^2)

## Merge Sort

- 길이가 N, M인 두 정렬된 리스트를 합쳐서 길이 N+M의 정렬된 리스트를 만드는 방법을 알아야 한다.
  - 두 리스트의 가장 작은 값끼리 비교해서 새로운 배열에 집어넣기 반복
- Merge Sort는 Stable Sort이다!
  - 같은 값의 원소가 있을 때, 정렬 후에도 원래의 상대적인 위치가 유지된다.

> [!NOTE]
>
> 시간복잡도: O(NlogN)
>
> 추가적으로 필요한 공간 (Overhead): O(N)
>
> Stable Sort: O

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

## Quick Sort

- 배열 중 pivot을 설정하고, 피벗보다 작은 값과 큰 값을 분리하여 정렬하는 방법

> [!NOTE]
>
> 시간복잡도: Amortized O(NlogN) 단 평균적으로 Merge Sort보다 빠름
>
> 추가적으로 필요한 공간 (Overhead): O(1)
>
> Stable Sort: X

### 코드

```py
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    lesser_arr, equal_arr, greater_arr = [], [], []
    for num in arr:
        if num < pivot:
            lesser_arr.append(num)
        elif num > pivot:
            greater_arr.append(num)
        else:
            equal_arr.append(num)
    return quick_sort(lesser_arr) + equal_arr + quick_sort(greater_arr)
```

### 최적화 코드

```py
def quick_sort(arr):
    def sort(low, high):
        if high <= low:
            return

        mid = partition(low, high)
        sort(low, mid - 1)
        sort(mid, high)

    def partition(low, high):
        pivot = arr[(low + high) // 2]
        while low <= high:
            while arr[low] < pivot:
                low += 1
            while arr[high] > pivot:
                high -= 1
            if low <= high:
                arr[low], arr[high] = arr[high], arr[low]
                low, high = low + 1, high - 1
        return low

    return sort(0, len(arr) - 1)
```

## Counting Sort

### 구현 방법

- 미리 테이블을 만들어놓고, 각 수의 등장 횟수만 세면 됨.

> [!NOTE]
>
> 시간복잡도: O(N + K)
>
> K는 입력값의 범위

## Radix Sort

### 구현 방법

- 각 자릿수에 대해 첫째자리 수부터 차례대로 Counting Sort와 같이 배열에 값을 집어넣는다.
- 다음 자릿수에 대해 같은 방식으로 진행한다.
- 가장 큰 수의 자릿수만큼 반복한다.

> [!NOTE]
>
> 시간복잡도: O(DN)
>
> D는 자릿수의 최대 개수
