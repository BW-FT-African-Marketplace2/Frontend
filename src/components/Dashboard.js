import React from 'react';
import { connect } from 'react-redux';

const Dashboard = props => {
    return(
        <div>
            Dashboard works!
            {props.isLoading}
        </div>
    )
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {})(Dashboard);
