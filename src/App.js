import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import PrivateRoute from './components/private/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ListItem from './components/ListItem'

function App() {
  return(
    <div>
      <Navbar />
      <Switch>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <Signup />} />
        <Route path='/list-item' render={() => <ListItem />} />
      </Switch>
    </div>
  )
};

export default App;
