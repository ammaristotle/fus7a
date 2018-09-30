import React, { PureComponent } from  'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';

import './navigate.css'

const btnStyle = {
  textTransform: 'none',
};

class Navigation extends PureComponent {

  static propTypes = {
    handleChange: PropTypes.func.isRequired
  };

  render() {
    const { handleChange, current, total } = this.props;
    return (
      <div className="nav-buttons">
        <div className="progress">Progress: { current + 1 }/{ total }</div>
        <Button style={btnStyle} variant="contained" className="left-button" color="primary" onClick={handleChange.bind(this, 'previous')}>
          <ArrowBack />Prev
        </Button>
        <Button style={btnStyle} variant="contained" color="primary" onClick={handleChange.bind(this, 'next')}>
          Next<ArrowForward />
        </Button>
        <br />
      </div>
    )
  }
}

export default Navigation;
