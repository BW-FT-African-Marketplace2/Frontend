import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Item from './Item';

const ItemsForSale = props => {
    const { saved } = props
    const [item, setItem] = useState('');
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        axios
        .get(`https://fakestoreapi.com/products/${params.id}`)
        .then(res => {
            console.log(res.data);
            setItem(res.data);
        })
        .catch(err => console.log(err));
    }, [params.id])

    return (
        <div>
            {
                location.pathname === `/forSale/${params.id}` ? <Item item={item} /> : saved.map(itemData => {
                    return(
                        <Item key={itemData.id} item={itemData} />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        saved: state.savedList.saved
    }
}

export default connect(mapStateToProps, {})(ItemsForSale);