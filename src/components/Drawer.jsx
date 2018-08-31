import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Label from '@material-ui/icons/Label';

const styles = theme => ({
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 5,
  },
});

class NavigationDrawer extends Component {
  state = {
    buttons: [
      {
        text: 'First lesson',
        nested: false,
        nest: [
          {
            text: "Ism, F'il and Harf",
            lesson: 'lesson1_part1'
          },
          {
            text: "Raf', Nasb, and Jarr",
            lesson: 'lesson1_part2'
          },
          {
            text: 'Sounds and Combinations',
            lesson: 'lesson1_part3'
          },
          {
            text: 'Status in Arabic',
            lesson: 'lesson1_part4'
          }
        ]
      },
      {
        text: 'Lesson 2',
        lesson: 'lesson2_part1'
      }
    ],
  };

  renderListItems() {
    const { classes } = this.props;
    return this.state.buttons.map((button, i) => {
      if (button.nest) {
        return (
          <React.Fragment>
            <ListItem button onClick={this.handleClick.bind(this, false, i, null)}>
              <ListItemIcon>
                <StarBorder style={{ color: 'rgb(62,84,175)' }} />
              </ListItemIcon>
              <ListItemText inset primary="Lesson 1" />
              { button.nested ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={button.nested} timeout="auto" unmountOnExit>
              <List component="div" disablePadding >
                {
                  button.nest.map((nestedButton, j) => {
                    return (
                      <ListItem className={classes.nested} button onClick={this.handleClick.bind(this, true, i, j)}>
                        <ListItemIcon>
                          <Label />
                        </ListItemIcon>
                        <ListItemText inset primary={nestedButton.text} />
                      </ListItem>
                    )
                  })
                }
              </List>
            </Collapse>
          </React.Fragment>
        )
      } return (
        <ListItem button onClick={this.handleClick.bind(this, false, i, null)}>
          <ListItemIcon>
            <StarBorder style={{ color: 'rgb(62,84,175)' }} />
          </ListItemIcon>
          <ListItemText inset primary={button.text} />
        </ListItem>
      )
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
                subheader={
                  <ListSubheader
                    component="div"
                    style={{ fontSize: '17px' }}
                  >
                    Select an Exercise
                  </ListSubheader>
                }
              >
                { this.renderListItems() }
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
