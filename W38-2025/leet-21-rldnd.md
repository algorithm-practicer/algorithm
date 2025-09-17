# [[LeetCode] 21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists)

> [Merge]

## 발상

- Merge Sort와 비슷한 구현

## <br>정답 코드

```python
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution(object):
    def mergeTwoLists(self, list1, list2):
        answer = ListNode()
        tail = answer

        while list1 and list2:
            if list1.val < list2.val:
                newNode = ListNode(list1.val)
                list1 = list1.next
            else:
                newNode = ListNode(list2.val)
                list2 = list2.next
            tail.next = newNode
            tail = tail.next

        while list1:
            newNode = ListNode(list1.val)
            list1 = list1.next
            tail.next = newNode
            tail = tail.next

        while list2:
            newNode = ListNode(list2.val)
            list2 = list2.next
            tail.next = newNode
            tail = tail.next

        return answer.next

        """
        :type list1: Optional[ListNode]
        :type list2: Optional[ListNode]
        :rtype: Optional[ListNode]
        """

```
