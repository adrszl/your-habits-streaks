import { useState } from 'react';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import "./App.css";

function App() {

  const [userName, setUserName] = useState('unknown');

  axios.get('http://localhost:3001/userName')
    .then((response) => {
      console.log(response.data.name);
      setUserName(response.data.name);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })

  return (
    <div>
      {/* header */}
      <AppBar position="static">
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
        </Toolbar>
      </AppBar>
      {/* header */}
    </div>
  );
}

export default App;
