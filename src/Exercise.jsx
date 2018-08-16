import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';

import { Instructions, Question, AnswerChoices } from './components/exercise';

const myWord = 'إنِّي أُحِبُّ اللهَ وَ رَسُولَهُ'.split(' ').reverse();

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
          answerChoices: ['Yes', 'No'],
          answerChoiceResponses: ['That is correct', 'That is not correct'],
          correctAnswer: 0,
        }
      ]
    }
  }

  handleAnswerResponse(indexOfAnswerSelected) {
    const { questions, activeQuestion } = this.state;
    const currentQuestion = questions[activeQuestion];
    const responseToSelectedAnswer = currentQuestion.answerChoiceResponses[indexOfAnswerSelected];
    if (indexOfAnswerSelected === questions[activeQuestion].correctAnswer) {
      // handle correct behavior
    }
    this.setState({ activeAnswerChoiceResponse: responseToSelectedAnswer });
  }

  render() {
    const { instructions, questions, activeQuestion } = this.state;
    const { answerChoices, correctAnswer } = questions[activeQuestion];
    console.log(this.state.activeAnswerChoiceResponse);
    return (
      <div className="wrapper">
        <Instructions instructions={instructions} />
        <Question questions={questions} active={0} />
        <AnswerChoices
          handle={this.handleAnswerResponse.bind(this)}
          choices={answerChoices}
        />
      </div>
    );
  }
}

Exercise.propTypes = {
};

export default Exercise;
