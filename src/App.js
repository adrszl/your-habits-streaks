import { useState, useEffect } from 'react';
import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import "./App.css";
import CustomModal from './components/CustomModal';

function App() {
  const theme = createTheme({
    palette: {
      black: {
        main: '#000',
        contrastText: '#fff',
      },
      darkTheme: {
        background: '#000',
        text: '#fff'
      }
    }
  });

  const [userName, setUserName] = useState('unknown');
  const [activeHabits, setActiveHabits] = useState(undefined);
  const [succeededHabits, setSucceededHabits] = useState(undefined);
  const [failedHabits, setFailedHabits] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/userName')
    .then((response) => {
      console.log(response.data.name);
      setUserName(response.data.name);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })

    axios.get('http://localhost:3001/activeHabits')
    .then((response) => {
      console.log(response.data);
      setActiveHabits(response.data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })

    axios.get('http://localhost:3001/succeededHabits')
    .then((response) => {
      console.log(response.data);
      setSucceededHabits(response.data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })

    axios.get('http://localhost:3001/failedHabits')
    .then((response) => {
      console.log(response.data);
      setFailedHabits(response.data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })
  }, []);

  const addNewEntry = (entryType) => {
    if(entryType === 'active-habit') {
      setModalTitle("Add new Active Habit");
      setModalDescription("Add new habit you wish to start working on");
      setOpenModal(true);
    } else if(entryType === 'succeeded-habits') {
      setModalTitle("Add Past Succeed Habits");
      setModalDescription("Add new habit you already succeeded before");
      setOpenModal(true);
    } else if(entryType === "failed-habits") {
      setModalTitle("Add Past Failed Habits");
      setModalDescription("Add new habit you failed to implement before");
      setOpenModal(true);
    }
  }

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* header */}
        <AppBar position="static" color={{bgcolor: 'darkTheme.background'}}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              { userName === 'unknown' ?  null : userName + "'s" } Habits
            </Typography>
            <FormControlLabel control={
              <Switch 
                checked={switchChecked}
                onChange={handleSwitchChange} />}
              label="Dark mode" color="black" />
          </Toolbar>
        </AppBar>
        {/* header */}
        {/* main view */}
        <main>
          {/* add new entry modal */}
          <CustomModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalTitle={modalTitle}
            modalDescription={modalDescription} />
          {/* add new entry modal */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper>
                  <Typography level="h4">Your current habits</Typography>
                  <ul>
                    {activeHabits ? 
                      activeHabits.map((habit) => {
                        return <li key={`li-item-${habit.title}`}>{habit.title} <i>{habit.excerpt}</i></li>
                      })
                    : null}
                  </ul>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Tooltip title="Add new habit you wish to start working on">
                      <Button variant="contained" onClick={() => addNewEntry('active-habit')}>Add new</Button>
                    </Tooltip>
                  </div>                  
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <Typography level="h4">Your past succeed habits</Typography>
                  <ul>
                    {succeededHabits ? 
                      succeededHabits.map((habit) => {
                        return <li key={`li-item-succeeded-${habit.title}`}>{habit.title} <i>{habit.excerpt}</i></li>
                      })
                    : null}
                  </ul>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Tooltip title="Manually add a habit, which you succeeded in the past">
                      <Button variant="contained" onClick={() => addNewEntry('succeeded-habits')}>Add new</Button>
                    </Tooltip>
                  </div> 
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <Typography level="h4">Your past failed habits</Typography>
                  <ul>
                    {failedHabits ? 
                        failedHabits.map((habit) => {
                          return <li key={`li-item-failed-${habit.title}`}>{habit.title} <i>{habit.excerpt}</i></li>
                        })
                    : null}
                  </ul>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Tooltip title="Manually add a habit, which you failed in the past">
                      <Button variant="contained" onClick={() => addNewEntry('failed-habits')}>Add new</Button>
                    </Tooltip>
                  </div> 
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </main>
        {/* main view */}
      </ThemeProvider>
    </div>
  );
}

export default App;
