import React, { useState, useEffect } from 'react'

// MUI
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// components
import NoteCard from '../component/NoteCard.js'

// Plugins
import Masonry from 'react-masonry-css'

// style
import { makeStyles } from '@material-ui/core/styles';

// styles
const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  mb30: {
    marginBottom: 30
  }
}));

export default function Notes() {

  const [notes, setNotes] = useState([]);

  const classes = useStyles();

  // componentDidMount
  useEffect(()=> {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // methods
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE'
    });

    const newNotes = notes.filter(note => note.id != id);
    setNotes(newNotes);
  }

  // React Masonry Breakpoints
  const masonryBreakpoints = {
    default: 3,
    991: 2,
    680: 1
  }

  return (
    <Container>
      <Typography variant="h4" color="primary" className={classes.mb30}>
        Notes page
      </Typography>


      {/* <Grid
        container
        spacing={3}
      >
        {
          notes.map(note => (
            <Grid item key={note.id} xs={12} sm={6} md={4}>
              <Paper>
                <NoteCard note={note} handleDelete={handleDelete}/>
              </Paper>
            </Grid>
          ))
        }
      </Grid> */}

      {/* 使用 React Masonry CSS */}
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
      {
        notes.map(note => (
            <NoteCard note={note} handleDelete={handleDelete}/>
        ))
      }
      </Masonry>
    </Container>
  )
}
