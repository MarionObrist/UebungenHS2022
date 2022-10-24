import React from 'react';
import Timer from './Timer';
import Button  from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


function App() {
    return (
    <>  
        <AppBar position='sticky' color='primary'>
          <Toolbar>
            <Typography variant='h3'>Counter</Typography>
          </Toolbar>
        </AppBar>


        <Timer/>

    </>);
}

export default App;