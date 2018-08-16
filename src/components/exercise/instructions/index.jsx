import React from  'react';
import PropTypes from 'prop-types';

import './instructions.css'

class Instructions extends React.PureComponent {

  static propTypes = {
    instructions: PropTypes.string.isRequired
  };

  render() {
    const { instructions } = this.props;
    return (
      <div className="exercise-instructions">
        { instructions }
      </div>
    )
  }
}

export default Instructions;
