import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchForSale } from '../store/actions/fetchForSaleAction'

const Dashboard = props => {
    const { isLoading, fetchForSale } = props;
    useEffect(() => {
      fetchForSale();
    }, [fetchForSale]);
    return(
        <div>
            Dashboard works!
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
