import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
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
    const { setSaved, saved, fetchUserData, fetchForSale, forSale } = props;
    const classes = useStyles();
    useEffect(() => {
      fetchUserData();
      fetchForSale();
    }, []);
    return(
        <div className={classes.root}>
            {
              forSale.map(item => {
                return (
                  <Item item={item} saved={saved} setSaved={setSaved} /> 
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
