import React from  'react';
import PropTypes from 'prop-types';

import './question.css'

class Question extends React.PureComponent {

  static propTypes = {
    questions: PropTypes.array.isRequired,
    active: PropTypes.number.isRequired,
  };

  static defaultProps = {
    questions: [],
    active: 0,
  };

  renderBold(qn) {
    const text = qn.text.split(' ');
    const indexOfWordToBold = qn.boldIndex;
    return (
      <div className="question">
        {
          text.map((word, i) => {
            if (i === indexOfWordToBold) return <span key={word + i} style={{fontWeight: 'bold'}}>{word}&nbsp;</span>
            return <span key={word + i}>{word}&nbsp;</span>
          })
        }
      </div>
    );
  }

  render() {
    const { questions, active } = this.props;
    const lang = questions[active].lang || 'en';
    if (questions[active].bold) return this.renderBold(questions[active]);

    return (
      <div className={`question ${lang === 'ar' && 'arabic'}`}>
        { questions[active].text }
      </div>
    )
  }
}

export default Question;
