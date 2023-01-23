import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Switch>
      <PublicRoute path='/login' component={Login} />
      <PublicRoute path='/signup'  component={Signup} />
      <PrivateRoute path ='/' exact component={Home} />
    </Switch>
    </>
  );
}

export default App;
