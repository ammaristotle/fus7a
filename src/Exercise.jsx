import React from 'react';
// import PropTypes from 'prop-types';

import { Instructions, Question, AnswerChoices, Response } from './components/exercise';

// const myWord = 'إنِّي أُحِبُّ اللهَ وَ رَسُولَهُ'.split(' ').reverse();

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      instructions: "Tell whether the word in bold is in raf', nasb, or jarr",
      hint: '',
      activeExercise: 'ex-name',
      activeQuestion: 0,
      activeAnswerChoiceResponse: '',
      exerciseType: 'multiple_choice',
      questions: [
        {
          text: 'My teacher drinks chocolate milk regularly',
          translation: '',
          lang: 'en',
          bold: true,
          boldIndex: 5,
          answerChoices: ['Raf', 'Nasb', 'Jarr'],
          answerChoiceResponses: ['That is not correct', 'That is correct', 'That is not correct'],
          correctAnswer: 1,
        }
      ]
    }
  }

  fetchExercise() {
    // Handle getting exercise data from server
    // Set response in state
  }

  navigateBetweenQuestions(direction) {
    // Hide previous answer response
    if (direction === 'forward') {
      // Change question
    } else {
      // Change question
    }
  }

  handleAnswerResponse(indexOfAnswerSelected) {
    const { questions, activeQuestion } = this.state;
    const currentQuestion = questions[activeQuestion];
    const responseToSelectedAnswer = currentQuestion.answerChoiceResponses[indexOfAnswerSelected];
    if (indexOfAnswerSelected === questions[activeQuestion].correctAnswer) {
      this.setState({ correctAnswerSelected: true });
      // handle correct behavior
    } else {
      this.setState({ correctAnswerSelected: false })
    }
    this.setState({ answerChoiceResponse: responseToSelectedAnswer });
  }

  render() {
    const {
      instructions,
      questions,
      activeQuestion,
      answerChoiceResponse,
      correctAnswerSelected
    } = this.state;
    // todo
    // show loading if server data isn't rendered/retrieved just yet
    const { answerChoices } = questions[activeQuestion];
    return (
      <div className="wrapper">
        <Instructions instructions={instructions} />
        <Question questions={questions} active={0} />
        <AnswerChoices
          handle={this.handleAnswerResponse.bind(this)}
          choices={answerChoices}
        />
        { answerChoiceResponse && <Response text={answerChoiceResponse} correct={correctAnswerSelected} /> }
      </div>
    );
  }
}

export default Exercise;
