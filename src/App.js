import React, { useState }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import LeaveTracker from './pages/leaveTracker/LeaveTracker';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import LeaveSection from './pages/leaveTracker/LeaveSection/LeaveSection';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // Hardcoded user credentials for now
    const validUsers = [
      { username: 'user1', password: '1' },
      { username: 'user2', password: 'password2' },
     
    ];
 
    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    );
 
    if (user) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };
  return (
    <Router>
    <div>
    {isAuthenticated? (
      <>
      <Navbar />
      <Routes>
      <Route path="/" element={<LeaveSection />} />
      </Routes>
         </>
         ) : (
          <LoginForm   onLogin={handleLogin} />
         )}
    </div>
    </Router>
  );
}

export default App;
