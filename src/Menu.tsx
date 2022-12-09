import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

function Menu() {
	return (
		<Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                href="/"
              >
                Home
              </IconButton>
              
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                href="/zodiac"
              >
                NLP Horoscopes
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                href="https://github.com/tarinyoom"
              >
                Github
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
	)
}

export default Menu;
