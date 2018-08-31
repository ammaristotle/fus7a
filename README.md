# fus7a ✏️

a nimble quizlet-esque app to pull exercise questions in JSON format and practice! (works in Arabic too!)

## Overview

The client side code is written in React. It makes API calls to a JSON url to retrieve question data, which is then rendered.

Users can navigate between questions, see their progress through a lesson, get immediate feedback to their answers, and switch exercises. It sounds like a lot, but it's really simple.

### Mix it up

If you want to make your own set of questions, the JSON API spec is roughly as follows:

```javascript
{
  "instructions": "Answer the math question",
  "hint": "It has something to do with adding",
  "numOfQuestions": 1,
  "questions": [
    {
      "language": "en", // English
      "translation": "none", // Helpful for Arabic!
      "text": "What is 2 + 2?",
      "answerChoices": [
        "4", "3", "22"
      ],
      "answerChoiceResponses": [
        "Correct!", "Incorrect", "Incorrect"
      ],
      "correctAnswer": 0
    }
  ]
}
```

## Hosting

Since right now it's only client-side, I am using CloudFront to serve assets in front of an S3 bucket configured for static site hosting. You could also use something like GitHub pages, if you like.

#### Notes

I do have some python scripts that take CSV question data, fix any issues with RTL (with Arabic text) and then generate the JSON. They are not open source right now but will be released at a later date.
