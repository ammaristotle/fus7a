import React from  'react';
import PropTypes from 'prop-types';

import './response.css';

class Response extends React.PureComponent {

  static propTypes = {
    text: PropTypes.string,
    correct: PropTypes.bool,
  };

  render() {
    const { text, correct } = this.props;
    return (
      <div className={`response ${correct ? 'correct' : 'incorrect'}`}>
        { text }
      </div>
    )
  }
}

export default Response;
