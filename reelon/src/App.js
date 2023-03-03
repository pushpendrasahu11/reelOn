import logo from './logo.svg';
import './App.css';


import Signup from './components/Signup';
import Login from './components/Login';


import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
function App() {
  return (

    <Router>
    <AuthProvider>

    <Routes>

    <Route path="/signup"  element={<Signup />} />
    <Route path="/login"  element={<Login />} />
    
    </Routes>

    </AuthProvider>
    </Router>
    
  );
}

export default App;
