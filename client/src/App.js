import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Book from './pages/Book';
import Specialities from './pages/specialities';

function App() {
  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>} />  
            <Route path="/specialities" element={ <Specialities />}/>
            <Route path="/book" element={ <Book/>}/>
            <Route path="/login" element={ <Login />}/>
            <Route path="/dashboard" element={ <Dashboard />}/>


          
        </Routes>
      
    </>
  );
}

export default App;
