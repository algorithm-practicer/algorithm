# [[BOJ] 수 정렬하기2](https://www.acmicpc.net/problem/2751)

> [정렬]

## 발상

- Merge Sort 연습하기

## <br>정답 코드 - Merge Sort

```python
import sys
readline = sys.stdin.readline

N = int(readline())
arr = []
for _ in range(N):
    arr.append(int(readline()))

def merge_sort(arr):
    def sort(low, high):
        if high - low == 1:
            return
        mid = (high + low) // 2
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

merge_sort(arr)

for i in arr:
    print(i)

```

## <br>정답 코드 - Quick Sort

```python
import sys
readline = sys.stdin.readline
N = int(readline())
arr = [int(readline()) for _ in range(N)]

def heap_sort(arr):
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
                low += 1
                high -= 1

        return low

    return sort(0, len(arr) - 1)

heap_sort(arr)
for i in arr:
    print(i)

```
