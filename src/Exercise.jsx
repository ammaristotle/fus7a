import React from 'react';
// import PropTypes from 'prop-types';
import { Instructions, Question, AnswerChoices, Response, Navigation } from './components/exercise';

// const myWord = 'إنِّي أُحِبُّ اللهَ وَ رَسُولَهُ'.split(' ').reverse();

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      instructions: "Tell whether the word in bold is in raf', nasb, or jarr",
      hint: '',
      activeExercise: 'ex-name',
      activeQuestion: 0,
      answerChoiceResponse: '',
      exerciseType: 'multiple_choice',
      numOfQuestions: 2,
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
        },
        {
          text: 'He loves chocolate milk',
          translation: '',
          lang: 'en',
          bold: true,
          boldIndex: 0,
          answerChoices: ['Raf', 'Nasb', 'Jarr'],
          answerChoiceResponses: ['That is correct', 'That is not correct', 'That is not correct'],
          correctAnswer: 0,
        }
      ]
    }
  }

  fetchExercise() {
    // Handle getting exercise data from server
    // Set response in state
  }

  /**
   * Go forward and back between questions
   * @param  {String} direction either "next" or not
   * @return {Void}
   */
  navigateBetweenQuestions(direction) {
    // Decide whether to go to next or previous question
    const increment = (direction === 'next' ? 1 : -1);
    const { activeQuestion, numOfQuestions } = this.state;
    // The question we want to end up at
    const endingNumber = activeQuestion + increment;
    // If we reached the end, we don't want to do anything
    const reachedEndOfQuestions = (
      (endingNumber === -1) || (endingNumber === numOfQuestions)
      ? true
      : false
    );
    // As long as we're not the end, navigate to next or previous question
    if (!reachedEndOfQuestions) {
      this.setState((prevState, props) => {
        return {
          activeQuestion: prevState.activeQuestion + increment,
          answerChoiceResponse: '',
        };
      });
    }
  }

  /**
   * Handle user selected answer and display response
   * @param  {Number} indexOfAnswerSelected taken from answerChoices in each
                      question
   * @return {Void}
   */
  handleAnswerResponse(indexOfAnswerSelected) {
    const { questions, activeQuestion } = this.state;
    const currentQuestion = questions[activeQuestion];
    const { correctAnswer, answerChoiceResponses } = currentQuestion;
    const responseToSelectedAnswer = answerChoiceResponses[indexOfAnswerSelected];
    this.setState({
      answerChoiceResponse: responseToSelectedAnswer,
      correctAnswerSelected: indexOfAnswerSelected === correctAnswer,
    });
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
        <Question questions={questions} active={activeQuestion} />
        <AnswerChoices
          handle={this.handleAnswerResponse.bind(this)}
          choices={answerChoices}
        />
        { answerChoiceResponse && <Response text={answerChoiceResponse} correct={correctAnswerSelected} /> }
        <Navigation handleChange={this.navigateBetweenQuestions.bind(this)} />
      </div>
    );
  }
}

export default Exercise;
