import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Item from './Item';

const ItemsForSale = props => {
    const [item, setItem] = useState('');
    const params = useParams();
    useEffect(() => {
        axiosWithAuth()
        .get(`/api/users/${params.id}`)
        .then(res => {
            console.log(res.data.data);
            setItem(res.data.data);
        })
        .catch(err => console.log(err));
    }, [setItem])

    return (
        <div>
            <Item item={item}/>
        </div>
    )
}

export default ItemsForSale;