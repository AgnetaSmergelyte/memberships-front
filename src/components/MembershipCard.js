import React from 'react';

const MembershipCard = ({membership}) => {
    return (
        <div className="box text-center">
            <h2>${membership.price} {membership.name}</h2>
            <p>{membership.description}</p>
            <div className="d-flex j-end">
                <button className="btn-red">Delete</button>
            </div>
        </div>
    );
};

export default MembershipCard;