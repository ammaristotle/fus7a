import React from 'react';
import NavBar from './navBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  }

  _handleLogin(event) {
    event.preventDefault();
    // validate and send otherwise errors
    const { email, password } = this.state;
    this.props.action({ email, password });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
      <NavBar />
      <h1 style={{ marginTop: '40px', fontWeight: '500', fontSize: '25px' }}>
        Sign in to continue
      </h1>
      <TextField
        id="name"
        label="Email"
        autoFocus={true}
        placeholder="user@domain.com"
        style={{ width: '250px' }}
        value={this.state.name}
        onChange={this.handleChange('email')}
        margin="normal"
      />
      <br />
      <TextField
        id="password-input"
        label="Password"
        autoComplete="current-password"
        type="password"
        style={{ width: '250px' }}
        value={this.state.name}
        onChange={this.handleChange('password')}
        margin="normal"
      />
      <br />
      <Button
        variant="contained" color="primary"
        style={{ textTransform: 'none', marginTop: '30px' }}
        onClick={(event) => this._handleLogin(event)}
      >
        Log In
      </Button>
      </div>
    )
  }
}


export default Login;
