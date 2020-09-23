import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchForSale } from '../store/actions/fetchForSaleAction'

import Item from './Item';

const Dashboard = props => {
    const { forSale, isLoading, fetchForSale } = props;
    useEffect(() => {
      fetchForSale();
    }, [fetchForSale]);
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
    isLoading: state.isLoading,
    forSale: state.forSale,
    error: state.error
  }
}

export default connect(mapStateToProps, { fetchForSale })(Dashboard);
