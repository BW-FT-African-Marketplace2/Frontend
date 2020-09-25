import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';

import PrivateRoute from './components/private/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ListItem from './components/ListItem';
import ItemsForSale from './components/ItemsForSale';


function App() {
  return(
    <div>
      <Navbar />
      <Switch>
        <PrivateRoute exact path='/list-item/:id' component={ListItem} />
        <PrivateRoute path='/dashboard' component={() => <Dashboard />}/>
        <PrivateRoute path='/forSale/:id' component={() => <ItemsForSale  />} />
        <PrivateRoute path='/saved' component={() => <ItemsForSale />} />
        <PrivateRoute path='/list-item' component={() => <ListItem />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/signup' render={() => <Signup />} />
      </Switch>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    saved: state.savedList.saved
  }
}

export default connect(mapStateToProps, {})(App);
