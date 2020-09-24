import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchUserData, fetchForSale } from '../store/actions'

import Item from './Item';

const Dashboard = props => {
    const { users, usersIsLoading, fetchUserData, fetchForSale, forSale } = props;
    useEffect(() => {
      fetchUserData();
      fetchForSale();
    }, []);
    return(
        <div>
            {
              forSale.map(item => {
                return (
                  <Link key={item.id} to={`/forSale/${item.id}`}>
                    <Item key={item.id} item={item}/> 
                  </Link>
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
    forSale: state.fetchForSale.forSale
  }
}

export default connect(mapStateToProps, { fetchUserData, fetchForSale })(Dashboard);
