import React from  'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';

import './navigate.css'

class Navigation extends React.PureComponent {

  static propTypes = {
    handleChange: PropTypes.func.isRequired
  };

  render() {
    const { handleChange } = this.props;
    return (
      <div className="nav-buttons">
        <Button variant="contained" className="left-button" color="primary" onClick={handleChange.bind(this, 'previous')}>
          <ArrowBack />Prev
        </Button>
        <Button variant="contained" color="primary" onClick={handleChange.bind(this, 'next')}>
          Next<ArrowForward />
        </Button>
      </div>
    )
  }
}

export default Navigation;