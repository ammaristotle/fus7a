import React from  'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


// import './instructions.css'

const MultiChoiceButton = (props) => (
  <Button
    size="large"
    variant="contained"
    style={{ backgroundColor: '#eaeaea', margin: '10px'}}
    onClick={props.func}
  >
    {props.text}
  </Button>
)

class AnswerChoices extends React.PureComponent {

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  _onAnswerClick(event, index) {
    console.log('clicked');
    console.log(this.props.handle(index));
  }

  render() {
    const { choices, handle } = this.props;
    return (
      <div>
        {
          choices.map((answerText, index) => (
            <MultiChoiceButton
              func={(event) => this._onAnswerClick(event, index)}
              text={answerText}
            />
          ))
        }
      </div>
    )
  }
}

export default AnswerChoices;
