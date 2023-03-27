
import { ThemeProvider } from '@mui/material';
import './App.css';
import Navbar from './components/Header/Navbar';
import Side from './components/Side/Side';
import { siteTheme } from './components/siteTheme';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={siteTheme}>
      <div className="content">
        <Navbar/>
        <Home />
        boner
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
