# [[LeetCode] 1768. Merge Strings Alternately](https://leetcode.com/problems/merge-strings-alternately/)

## 발상

- 반복문을 사용할 수 있을 것이다.
- 두 개의 포인터를 사용해서 각 문자열의 문자를 번갈아가며 추가한다.

## <br>정답 코드 1

```python
class Solution(object):
    def mergeAlternately(self, word1, word2):
        """
        :type word1: str
        :type word2: str
        :rtype: str
        """

        answer = ""
        word1Pointer = 0
        word2Pointer = 0

        while word1Pointer < len(word1) and word2Pointer < len(word2):
            answer += word1[word1Pointer]
            answer += word2[word2Pointer]
            word1Pointer += 1
            word2Pointer += 1

        while word1Pointer < len(word1):
            answer += word1[word1Pointer]
            word1Pointer += 1

        while word2Pointer < len(word2):
            answer += word2[word2Pointer]
            word2Pointer += 1

        return answer
```

## <br>정답 코드 2

```python
class Solution(object):
    def mergeAlternately(self, word1, word2):
        """
        :type word1: str
        :type word2: str
        :rtype: str
        """

        minimumLength = min(len(word1), len(word2))
        longerWord = word1 if len(word1) > len(word2) else word2

        answer = ""

        for i in range(minimumLength):
            answer += word1[i]
            answer += word2[i]

        for i in range(minimumLength, len(longerWord)):
            answer += longerWord[i]

        return answer
```
