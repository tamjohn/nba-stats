import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LandingPage from './component/landingPage'

function App() {
  return(
    <div className="App">
      <header className="App-header">
        <CssBaseline />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        </BrowserRouter>
      </header>

    </div>
  )
}

export default App;