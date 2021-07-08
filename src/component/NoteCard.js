import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';

// MUI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import Typography from '@material-ui/core/Typography';
import { Avatar, makeStyles } from '@material-ui/core';
import { blue, green, pink, yellow } from '@material-ui/core/colors';

// 也可以透過傳入特定的元件資料，製作動態綁定的CSS樣式
const useStyles = makeStyles((theme) => ({
  redBorder: {
    // 特定的屬性可以傳入 function，其中帶的參數就是 useStyles 所帶入的值
    // 經過判斷後 return 不同狀況的css屬性
    border: note => (note.category === 'work' ? '1px solid red' : 'none')
  },

  odinColor: {
    // color: (note, isMinW600) => (isMinW600 ? 'pink' : 'blue'),
    color: theme.palette.odin,
    [theme.breakpoints.up('md')]: {
      color: 'red'
    },
    [theme.breakpoints.up('lg')]: {
      color: 'blue'
    },
    [theme.breakpoints.up('xl')]: {
      color: 'purple'
    },
    [theme.breakpoints.up('odin')]: {
      color: 'aqua'
    },
    [theme.breakpoints.up('xxl')]: {
      color: 'black'
    }
  },

  avatar: {
    backgroundColor: note => {
      if(note.category === 'work') {
        return yellow[700]
      } else if(note.category === 'money') {
        return pink[700]
      } else if(note.category === 'todos') {
        return blue[700]
      } else {
        return green[700]
      }
    }
  }
}));


export default function NoteCard({ note, handleDelete }) {


  const isMinW600 = useMediaQuery('(min-width:600px)');

  const classes = useStyles(note);

  console.log('isMinW600', isMinW600);

  return (
    <div>
      <Card
        elevation={3}
        className={classes.redBorder}
      >
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              { note.category[0].toUpperCase() }
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />

        <CardContent>
          <Typography 
            variant="body2"
            color="textSecondary"
            className={classes.odinColor}
        >
            { note.details }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}