import { Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Start from './views/Start/Start';
import Register from './views/Register/Register';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/start' element={<Start />} />
      </Routes>
    </>
  );
}

export default App;
