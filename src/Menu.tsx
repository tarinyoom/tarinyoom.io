import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';

function Menu() {
	return (
		<Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

            <NavLink to="/">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  Home
                </IconButton>
              </NavLink>

              <NavLink to="/zodiac">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  NLP Horoscopes
                </IconButton>
              </NavLink>

              <a href="https://github.com/tarinyoom">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  Github
                </IconButton>
              </a>
            </Toolbar>
          </AppBar>
        </Box>
	)
}

export default Menu;
