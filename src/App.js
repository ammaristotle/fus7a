import React, { Component } from 'react';
import NavBar from './navBar';
import Drawer from './Drawer';
import Exercise from './Exercise';
import Login from './Login';

class App extends Component {

  signIn(data) {
    console.log(data);
    localStorage.setItem('f4a_email', data.email)
    this.setState({
      auth: true,
      email: data.email,
    });
  }

  constructor() {
    super();
    this.state = {
      email: localStorage.getItem('f4a_email'),
      drawerOpen: false,
      auth: false,
    }
  }

  toggled() {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  }

  changeExercise(exercise) {
    this.setState({ exercise });
    this.toggled();
  }

  renderApp() {
    return (
      <div>
        <NavBar toggle={this.toggled.bind(this)} />
        <Drawer
          change={this.changeExercise.bind(this)}
          open={this.state.drawerOpen}
          toggle={this.toggled.bind(this)}
        />
        <Exercise exercise={this.state.exercise} />
      </div>
    )
  }

  render() {
    const { email } = this.state;
    if (!email) return (<Login action={this.signIn.bind(this)} />);
    return this.renderApp();
  }
}

export default App;
