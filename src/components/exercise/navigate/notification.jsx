import React, { PureComponent } from  'react';
import Snackbar from '@material-ui/core/Snackbar';

class ReachedEndNotification extends PureComponent {
  state = {
    open: true,
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={this.state.open}
        onClose={this.handleClose}
        autoHideDuration={5000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">🎉 You&rsquo;ve reached the end!</span>}
      />
    )
  }
}

export default ReachedEndNotification;
