import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import githubLogo from './img/logos/github.png';

export default function MyAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{"visibility": "hidden"}}>
        <Toolbar />
      </AppBar>

      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Adam Reynolds' Projects
          </Typography>
          <a href="https://github.com/tarinyoom">
            <Button color="inherit">
              <img width="28px" height="28px" src={githubLogo} />
            </Button>
          </a>
          <a href="mailto:adam.chiu.reynolds@gmail.com">
            <Button color="inherit">
              <EmailIcon fontSize="large"/>
            </Button>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}