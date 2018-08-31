import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { Instructions, Question, AnswerChoices, Response, Navigation } from './exercise';

const Loading = () => (
  <CircularProgress
    style={{ position: 'absolute', top: '50%', left: '50%'}}
    size={50}
  />
);

const Error = () => (
  null
)

class Exercise extends React.Component {

  static propTypes = {
    exercise: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      hint: '',
      activeExercise: props.exercise || 'lesson1_part1',
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
      .then((response) => (response.json()))
      .then(
        data => {
            const { instructions, numOfQuestions, questions, hint } = data;
            this.setState({
              instructions,
              numOfQuestions,
              questions,
              hint,
              loading: false,
              activeQuestion: 0,
              answerChoiceResponse: '',
            })
        },
        error => this.setState({ error: true, loading: false })
      );
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
    // If we've reached the end, we don't want to do anything
    const reachedEndOfQuestions = (
      (endingNumber === -1) || (endingNumber === numOfQuestions)
    );
    // Navigate to next or previous question
    if (!reachedEndOfQuestions) {
      this.setState((prevState) => {
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
    const { activeExercise } = this.state;
    this.fetchExercise(activeExercise);
  }

  // Change exercise
  componentWillReceiveProps(nextProps) {
    const { activeExercise } = this.state, { exercise } = nextProps;
    if (exercise !== activeExercise && exercise !== undefined) {
      this.setState({ activeExercise: exercise });
      this.fetchExercise(exercise);
    }
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
      numOfQuestions,
    } = this.state;

    if (error) return (<div>ERROR</div>);
    if (loading) return (<Loading />);

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
        <Navigation
          handleChange={this.navigateBetweenQuestions.bind(this)}
          current={activeQuestion}
          total={numOfQuestions}
        />
      </div>
    );
  }
}

export default Exercise;
