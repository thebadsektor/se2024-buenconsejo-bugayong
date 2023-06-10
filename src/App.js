import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/layout';
import MainPage from './components/mainpage/mainPage';
import ReservePage from './components/newReservePage';

const App = () => (
  <Box
    id="App"
    sx={{
      display: { sx: 'block', sm: 'flex' },
      position: 'relative',
    }}
  >
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="newreservepage" element={<ReservePage />} />
    </Routes>
  </Box>
);

export default App;
