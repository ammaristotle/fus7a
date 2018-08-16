import React from 'react';
// import PropTypes from 'prop-types';
import NavBar from './navBar';
import Drawer from './Drawer';
import Exercise from './Exercise';

class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Drawer />
        <Exercise />
      </div>
    );
  }
}

App.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default App;
