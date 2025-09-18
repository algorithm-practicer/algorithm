# [[LeetCode] 151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)

## 발상

- white space로 구분된 word들의 순서를 반대로 바꾸는 문제
- answer의 끝은 white space가 아니어야 하므로, 단어들을 뒤집은 후 join할 때 공백을 넣어주면 됨
- 4가지의 구분을 통해 상황을 분기하여 처리

## <br>정답 코드1

```python
WHITE_SPACE = " "

class Solution(object):
    def reverseWords(self, s):
        """
        :type s: str
        :rtype: str
        """

        answerList = []
        tempWord = ""
        hasWhitespaceAppearedBefore = False

        for char in list(s.strip()):
            if char == WHITE_SPACE and hasWhitespaceAppearedBefore:
                continue
            if char == WHITE_SPACE and not hasWhitespaceAppearedBefore:
                hasWhitespaceAppearedBefore = True
                answerList.append(tempWord)
                tempWord = ""
                continue
            if not char == WHITE_SPACE and hasWhitespaceAppearedBefore:
                hasWhitespaceAppearedBefore = False
                tempWord += char
                continue
            if not char == WHITE_SPACE and not hasWhitespaceAppearedBefore:
                tempWord += char
                continue
        answerList.append(tempWord)

        return ' '.join(answerList[::-1])
```

## <br>정답 코드2

```python
class Solution(object):
    def reverseWords(self, s):
        """
        :type s: str
        :rtype: str
        """
        words=s.split()
        reversed_words=words[::-1]
        return ' '.join(reversed_words)
```
