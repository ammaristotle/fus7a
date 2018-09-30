import React from  'react';
import PropTypes from 'prop-types';

import './response.css';

class Response extends React.PureComponent {

  static propTypes = {
    text: PropTypes.string,
    correct: PropTypes.bool,
  };

  state = {
    explain: false,
  }

  explain = () => {
    this.setState((state) => {
      return {
        explain: !state.explain
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // De-expand explanation if response is different
    if (nextProps.text !== this.props.text) this.setState({ explain: false });
  }

  // TODO
  // Use random response words instead of correct or incorrect
  render() {
    const { text, correct } = this.props;
    const { explain } = this.state;
    return (
      <div
        className={`response ${correct ? 'correct' : 'incorrect'}`}
        onClick={this.explain}
      >
        <span>
          <span style={{ fontWeight: 'bold' }}>
            { correct ? 'Correct' : 'Incorrect'}
          </span>
          &nbsp;(click for explanation)
        </span>
        { explain && <div style={{ marginTop: '15px' }}>{ text} </div>}
      </div>
    )
  }
}

export default Response;
