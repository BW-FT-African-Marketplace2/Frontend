import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import PrivateRoute from './components/private/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ListItem from './components/ListItem'
import ItemsForSale from './components/ItemsForSale';
import SavedList from './components/SavedList';


function App(props) {
  const [saved, setSaved] = useState([]);
  return(
    <div>
      <Navbar saved={saved}/>
      <Switch>
        <Route path='/dashboard' component={() => <Dashboard setSaved={setSaved} saved={saved}/>}/>
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <Signup />} />
        <Route path='/list-item' render={() => <ListItem />} />
        <Route path='/forSale/:id' render={() => <ItemsForSale />} />
        <Route path='/saved' render={() => <SavedList />} />
      </Switch>
    </div>
  )
};

export default App;
