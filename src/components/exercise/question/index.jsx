import React from  'react';
import PropTypes from 'prop-types';

import './question.css'

class Question extends React.PureComponent {

  static propTypes = {
  };

  renderBold(qn) {
    console.log(qn.text);
    const text = qn.text.split(' ');
    const indexOfWordToBold = qn.boldIndex;
    console.log(indexOfWordToBold);
    return (
      <div className="question">
        {
          text.map((word, i) => {
            if (i === indexOfWordToBold) return <span style={{fontWeight: 'bold'}}>{word}</span>
            return <span>{word}&nbsp;</span>
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
        My teacher drinks chocolate milk regularly.
      </div>
    )
  }
}

export default Question;
