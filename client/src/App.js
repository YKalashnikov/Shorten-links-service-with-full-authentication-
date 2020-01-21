import React from 'react';
import 'materialize-css';
import { useRoutes } from "./routes";
import {useAuth} from './hooks/auth';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar  from './components/NavBar';
import Loader  from './components/Loader';
import AuthContext from './context/AuthContext';

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  if(!ready) {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
   
    <div className="container">
    <Router>
      {isAuthenticated &&  <Navbar/>}
     {routes}
     </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
