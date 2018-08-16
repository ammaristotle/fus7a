import React from  'react';
import PropTypes from 'prop-types';

import './question.css'

class Question extends React.PureComponent {

  static propTypes = {
    questions: PropTypes.array,
    active: PropTypes.number,
  };

  renderBold(qn) {
    const text = qn.text.split(' ');
    const indexOfWordToBold = qn.boldIndex;
    return (
      <div className="question">
        {
          text.map((word, i) => {
            if (i === indexOfWordToBold) return <span key={word + i} style={{fontWeight: 'bold'}}>{word}</span>
            return <span key={word + i}>{word}&nbsp;</span>
          })
        }
      </div>
    );
  }

  render() {
    const { questions, active } = this.props;
    if (questions[active].bold) return this.renderBold(questions[active]);

    return (
      <div className="question">
        { questions[active].text }
      </div>
    )
  }
}

export default Question;
