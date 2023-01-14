import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Home from './Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#333333"
    } 
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  }
]);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
