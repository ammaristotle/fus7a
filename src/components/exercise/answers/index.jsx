import React from  'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import './answers.css';

const MultiChoiceButton = (props) => {
  const { answerChoiceLanguage: answerLang, language: questionLang } = props;
  return (
    <Button
      size="large"
      variant="contained"
      className={`button ${(questionLang === 'ar' && answerLang !== 'en') && 'arabic-btn'}`}
      onClick={props.func}
    >
      {props.text}
    </Button>
  )
}

class AnswerChoices extends React.PureComponent {

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  _onAnswerClick(event, index) {
    this.props.handle(index);
  }

  render() {
    const { choices, language, answerChoiceLanguage } = this.props;
    return (
      <div className={`answer-choices`}>
        {
          choices.map((answerText, index) => (
            <MultiChoiceButton
              key={answerText + index}
              func={(event) => this._onAnswerClick(event, index)}
              text={answerText}
              language={language}
              answerChoiceLanguage={answerChoiceLanguage}
            />
          ))
        }
      </div>
    )
  }
}

export default AnswerChoices;
