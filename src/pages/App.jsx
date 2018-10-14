import React, { Component } from 'react';
import { NavBar, Drawer, ExerciseRoot } from '../components';

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
      settings: {
        translation: localStorage.getItem('f4a_translation') === 'true'
      }
    }
  }

  toggled() {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  }

  changeExercise(exercise) {
    this.setState({ exercise });
    this.toggled();
  }

  updateSettings(setting, value) {
    this.setState(state => ({ settings: { ...state.settings, [setting]: value } }));
  }

  render() {
    const { drawerOpen, exercise, settings } = this.state;
    return (
      <div>
        <NavBar toggle={this.toggled.bind(this)} />
        <Drawer
          change={this.changeExercise.bind(this)}
          open={drawerOpen}
          toggle={this.toggled.bind(this)}
          updateSettings={this.updateSettings.bind(this)}
        />
        <ExerciseRoot exercise={exercise} settings={settings} />
      </div>
    )
  }
}

export default App;
