import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import TranslateIcon from '@material-ui/icons/Translate';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Label from '@material-ui/icons/Label';

import { exercises } from '../constants';

const styles = theme => ({
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 5,
  },
});

const Subheader = (props) => (
  <ListSubheader component="div" style={{ fontSize: '17px' }}>
    {props.text}
  </ListSubheader>
);

const ExerciseListItem = (props) => {
  const { style, func, button, icon } = props;
  // Display if exercise is new
  const ico = (button.new ? <FiberNewIcon style={{ color: '#f50057' }}/> : icon);
  return (
    <ListItem className={style} button onClick={func}>
      <ListItemIcon>
        { ico }
      </ListItemIcon>
      <ListItemText inset primary={button.text} />
    </ListItem>
  );
}

class NavigationDrawer extends Component {
  state = {
    buttons: exercises,
    checked: localStorage.getItem('f4a_translation') === 'true',
  };

  toggleTranslation = () => {
    this.setState((prevState) => {
      localStorage.setItem('f4a_translation', !prevState.checked);
      this.props.updateSettings('translation', !prevState.checked);
      return {
        checked: !prevState.checked,
      }
    });
  }

  renderListItems() {
    const { classes } = this.props;
    return this.state.buttons.map((button, i) => {
      const itemProps = {
        func: this.handleClick.bind(this, false, i, null),
        button,
        icon: <StarBorder style={{ color: 'rgb(62,84,175)' }} />,
      };
      if (button.nest) {
        return (
          <React.Fragment>
            <ListItem button onClick={this.handleClick.bind(this, false, i, null)}>
              <ListItemIcon>
                <StarBorder style={{ color: 'rgb(62,84,175)' }} />
              </ListItemIcon>
              <ListItemText inset primary={button.text} />
              { button.nested ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={button.nested} timeout="auto" unmountOnExit>
              <List component="div" disablePadding >
                {
                  button.nest.map((nestedButton, j) => {
                    const props = {
                      style: classes.nested,
                      func: this.handleClick.bind(this, true, i, j),
                      button: nestedButton,
                      icon: <Label />,
                    }
                    return (
                      <ExerciseListItem {...props} />
                    )
                  })
                }
              </List>
            </Collapse>
          </React.Fragment>
        )
      } return (<ExerciseListItem {...itemProps} />);
    })
  }

  toggleDrawer = (open) => () => {
    this.setState({ open });
    this.props.toggle();
  };

  handleClick = (nestedBtnClick, i, j) => {
    const { buttons } = this.state;
    // Clicked a nested button, show new exercise
    if (nestedBtnClick) {
      const { lesson } = buttons[i].nest[j];
      this.props.change(lesson);
      return;
    }

    // Clicked a button with a nest, unveil nest
    if (buttons[i].nest) {
      let btnState = [...buttons];
      const nested = !buttons[i].nested;
      const newButtonState = Object.assign({}, buttons[i], { nested });
      btnState[i] = newButtonState;
      this.setState(state => ({ buttons: btnState }));
      return;
    }

    // Clicked a regular button, show new exercise
    const { lesson } = buttons[i];
    this.props.change(lesson);
  };

renderSettings() {
    const { checked } = this.state;
    return (
      <ListItem>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary="Translation" />
        <ListItemSecondaryAction>
          <Switch
            onChange={this.toggleTranslation}
            checked={checked}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  render() {
    const { classes, open } = this.props;
    return (
      <div>
        <SwipeableDrawer
          open={open}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List
                component="nav"
                subheader={<Subheader text="Select an exercise" />}
              >
                { this.renderListItems() }
                <Divider />
                <Subheader text="Settings" />
                { this.renderSettings() }
              </List>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

NavigationDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationDrawer);
