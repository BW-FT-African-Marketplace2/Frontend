import React from 'react';

const Item = props => {
    const { item } = props;
    return(
        <div>
            <h4>{item.id}</h4>
            <p>Seller: {item.first_name} {item.last_name}</p>
            <p>Contact: {item.email}</p>
        </div>
    )
};

export default Item;