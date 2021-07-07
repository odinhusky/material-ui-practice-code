import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

// Router
import { useHistory } from 'react-router-dom'

// style
import { makeStyles } from '@material-ui/core/styles';

// Icons
import PublishIcon from '@material-ui/icons/Publish';
// import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

// TextField
import TextField from '@material-ui/core/TextField'

// 如果傳入 function 並且帶有 theme 的 argument，這裡的 theme 就是指 material-ui 的預設設定物件
// 可以參照官網的一覽表進行設定
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 30
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  title: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`
    // padding: theme.spacing(4)
  }
}));

export default function Create() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('todos');

  // error handling
  const [titleError, setTitleError] = useState(false);
  const [detailError, setDetailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset error status
    setTitleError(false);
    setDetailError(false)
    
    if(!title) {
      setTitleError(true);
    }

    if(!details) {
      setDetailError(true)
    }

    if(title && details) {
      console.log('title', title);
      console.log('detail', details);
      console.log('category', category);

      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category}),
      }).then(() => { history.push('/') })
    }
  }

  // styles
  const classes = useStyles();

  // history
  const history = useHistory()

  return (
    <Container>
      {/* <Typography variant="h1" color="prima" align="center">
        Odin Typography
      </Typography> */}

      {/* <Typography color="secondary" align="center" component="section" color="primary">
        Odin Typography
      </Typography>

      <Button variant="contained" color="secondary" endIcon={<AccessAlarmsIcon />}>
        Time
      </Button>

      <br />

      <Button variant="contained" type="submit" color="primary" href="https://material-ui.com/zh/api/button-base/#demos" endIcon={<PublishIcon />}>
        Submit
      </Button> */}

      {/* Title */}
      <Typography variant="h4" align="center" component="section" color="primary" className={classes.title}>
        Create Note
      </Typography>

      {/* form */}
      <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title1"
          variant="outlined"
          color="primary"
          className={classes.field}
          error={titleError}
          fullWidth
          required
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label="Note Title2"
          variant="outlined"
          color="secondary"
          className={classes.field}
          error={detailError}
          fullWidth
          required
          multiline
          rows={4}
        />

        <FormControl className={classes.field}>
          <FormLabel>Category</FormLabel>
          <RadioGroup value={details}  onChange={(e) => setDetails(e.target.value)}>
            <FormControlLabel value="money" label="Money" control={<Radio color="primary" />} />
            <FormControlLabel value="reminders" label="Reminders" control={<Radio color="secondary" />} />
            <FormControlLabel value="work" label="Work" control={<Radio color="primary" />} />
            <FormControlLabel value="todos" label="Todos" control={<Radio />} />
          </RadioGroup>
        </FormControl>

      <Button
        variant="contained"
        type="submit"
        color="primary"
        endIcon={<PublishIcon />}
      >
        Submit
      </Button>
      </form>

    </Container>
  )
}
