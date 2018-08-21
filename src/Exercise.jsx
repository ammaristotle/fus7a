import React from 'react';
// import PropTypes from 'prop-types';
import { Instructions, Question, AnswerChoices, Response, Navigation } from './components/exercise';

// const myWord = 'إنِّي أُحِبُّ اللهَ وَ رَسُولَهُ'.split(' ').reverse();

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hint: '',
      activeExercise: 'ex-name',
      activeQuestion: 0,
      answerChoiceResponse: '',
      exerciseType: 'multiple_choice',
      questions: [],
      loading: true,
      error: false,
    }
  }

  fetchExercise(exercise) {
    const url = `${process.env.REACT_APP_BASE_URL}${exercise}.json`;
    fetch(url)
      .then((response) => (response.ok ? response.json() : 'error'))
      .then((data) => {
        if (data === 'error') {
          // TODO log to sentry
          this.setState({ error: true, loading: false });
          return;
        }
        const { instructions, numOfQuestions, questions, hint } = data;
        this.setState({
          instructions,
          numOfQuestions,
          questions,
          hint,
          loading: false,
          activeQuestion: 0,
        })
      })
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

  componentWillMount() {
    console.log('mounted');
    this.fetchExercise('fusha_lesson1_part1');
  }

  render() {
    const {
      instructions,
      questions,
      activeQuestion,
      answerChoiceResponse,
      correctAnswerSelected,
      loading,
      error,
    } = this.state;

    if (error) return (<div>ERROR</div>);
    if (loading) return (<div>Loading</div>);

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
