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
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
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
  // Use a special button if the exercise is new!
  const iconToDisplay = (
    button.new
      ? <FiberNewIcon style={{ color: '#f50057' }}/>
      : icon
  );
  return (
    <ListItem className={style} button onClick={func}>
      <ListItemIcon>
        { iconToDisplay }
      </ListItemIcon>
      <ListItemText inset primary={button.text} />
        { props.nested === true && <ExpandLess />}
        { props.nested === false && <ExpandMore />}
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
    return this.state.buttons.map((button, buttonIndex) => {
      const itemProps = {
        func: this.handleClick.bind(this, false, buttonIndex),
        button,
        icon: <StarBorder style={{ color: 'rgb(62,84,175)' }} />,
      };
      if (button.nest) {
        return (
          <React.Fragment key={buttonIndex + 'b'}>
            <ExerciseListItem {...itemProps} nested={button.nested} />
            <Collapse in={button.nested} timeout="auto" unmountOnExit>
              <List component="div" disablePadding >
                {
                  button.nest.map((nestedButton, nestedButtonIndex) => {
                    const props = {
                      style: classes.nested,
                      func: this.handleClick.bind(this, true, buttonIndex, nestedButtonIndex),
                      button: nestedButton,
                      icon: <Label />,
                    }
                    return (
                      <ExerciseListItem {...props} key={nestedButtonIndex + 'n'} />
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

  /**
   * Handle changing exercises or expanding to show exercises
   * @param  {Boolean} nestedBtnClick clicked on a button nested under a lesson
   * @param  {Number} i              index of button
   * @param  {Number} j              index of nested button
   * @return {Void}
   */
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
      // Change the nested property for the button
      const nested = !buttons[i].nested;
      // Reassign the mutated object property
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
      <React.Fragment>
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
        <Divider />
        <Subheader text="Links" />
        <a href={process.env.REACT_APP_CLASS_PORTAL_LINK}
          style={{ textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
        <ListItem button>
          <ListItemIcon>
            <OpenInNewIcon />
          </ListItemIcon>
          <ListItemText primary="Class portal" />
        </ListItem>
        </a>
      </React.Fragment>
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
