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

  renderFlash(metadata) {
    return (
      <div className="flash-parent">
        <table>
          <tbody>
            <tr>
              <td>{metadata.questionType}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { questions, active, translate } = this.props;
    const currentQuestion = questions[active];
    const lang = currentQuestion.lang || 'en';
    if (currentQuestion.bold) return this.renderBold(currentQuestion);

    const { metadata } = currentQuestion;

    return (
      <div className={`question ${lang === 'ar' && 'arabic'}`}>
        { metadata && metadata.subquestion &&
          <span style={{ fontSize: '18px', display: 'block' }}>
            { metadata.subquestion }
          </span>
        }
        { currentQuestion.text }
        <span className="translation">
          { translate && currentQuestion.translation }
        </span>
        { metadata && metadata.questionType && this.renderFlash(metadata) }
      </div>
    )
  }
}

export default Question;
