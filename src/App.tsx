import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Zodiac from './pages/Zodiac';
import Menu from './Menu';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/zodiac",
    element: <Zodiac/>
  }
]);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Menu />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
