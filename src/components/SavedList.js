import React from 'react';
import { connect } from 'react-redux'
import { savedList } from '../store/actions';

const SavedList = (props) => {
    const { saved, savedList } = props;
    return (
        <div>
            SavedList works!<br />
            {props.saved.length}<br />
            <button onClick={() => savedList('add', 1)}>TEST!</button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        saved: state.savedList.saved
    }
}

export default connect(mapStateToProps, { savedList })(SavedList);