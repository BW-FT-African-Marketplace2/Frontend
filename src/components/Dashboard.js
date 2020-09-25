import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { fetchUserData, fetchForSale } from '../store/actions'
import { makeStyles } from '@material-ui/core/styles';

import Item from './Item';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  }
})

const Dashboard = props => {
    const { fetchUserData, fetchForSale, forSale } = props;
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
      fetchForSale();
    }, [fetchForSale]);

    return(
        <div className={classes.root}>
          <div>
          <h2>Items for Sale</h2>
          <Link to='/list-item'>Sell Item</Link>
          </div>
          
            {
              forSale.map(item => {
                return (
                  <Item key={item.id} item={item} /> 
                )
              })
            }
        </div>
    )
};

const mapStateToProps = state => {
  return {
    usersIsLoading: state.fetchUserData.isLoading,
    userError: state.fetchUserData.error,
    users: state.fetchUserData.users,
    forSaleIsLoading: state.fetchForSale.isLoading,
    forSaleError: state.fetchForSale.error,
    forSale: state.fetchForSale.forSale,
  }
}

export default connect(mapStateToProps, { fetchUserData, fetchForSale })(Dashboard);
