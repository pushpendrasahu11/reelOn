import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Extra from './components/Extra';
import PrivateRoute from './components/PrivateRoute';


import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
function App() {
  return (

    <Router>
    <AuthProvider>

    <Routes>

    <Route path="/signup"  element={<Signup />} />
    <Route path="/login"  element={<Login />} />

   
    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
     
    
    </Routes>

    </AuthProvider>
    </Router>
    
  );
}

export default App;
