import React from 'react'
// style
import { makeStyles } from '@material-ui/core'

// MUI
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar'

// Icons
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom';

// Plugins
import { format } from 'date-fns'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: '#f9f9f9',
    width: '100%'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    display: 'flex'
  },
  active: {
    backgroundColor: 'yellow'
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  // 利用這個 mixin 取得 Toolbar 的 css 設定
  dummyToolbar: theme.mixins.toolbar,
  childrenBox: {
    paddingTop: theme.spacing(2)
  },
  datetime: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: theme.spacing(2)
  }
}))

export default function Layout({ children }) {

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Notes',
      icon: <SubjectOutlined color="primary" />,
      path: '/',
      id: 1
    }, {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: '/create',
      id: 2
    }
  ];

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar
        color="primary"
        className={classes.appbar}
        elevation={6}
      >
        <Toolbar>
          {/* Now Date Time */}
          <Typography className={classes.datetime}>
            { `Today is the${format(new Date(), 'd MMMM Y')}` }
          </Typography>

          {/* Logined Username */}
          <Typography>
            Mario
          </Typography>

          {/* Avatar */}
          <Avatar
            src="https://randomuser.me/api/portraits/med/men/64.jpg"
            className={classes.avatar}
          />
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        // 從哪裡彈出來
        anchor="left"
        // 覆蓋裡面的元件的CSS
        classes={{paper: classes.drawerPaper}}
      >
        {/* <Typography variant="h5">
          Odin Notes
        </Typography> */}

        {/* links/list section */}
        <List
          subheader={
            <ListSubheader component="div">
              Odin Notes
            </ListSubheader>
          }
        >
          {
            menuItems.map(item => (
              <ListItem
                key={item.id}
                button
                onClick={() => {history.push(item.path)}}
                className={location.pathname === item.path ? classes.active : null}
              >
                <ListItemIcon>
                  { item.icon }
                </ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItem>
            ))
          }
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.dummyToolbar}></div>
        <div className={classes.childrenBox}>
          { children }
        </div>
      </div>
    </div>
  )
}
