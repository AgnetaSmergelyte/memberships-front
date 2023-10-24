import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const UserCard = ({user}) => {
    const memberships = useSelector(state => state.memberships);
    const [usersMembership, setUsersMembership] = useState('');

    useEffect(() => {
        const service = memberships.find(x => x._id === user.service_id);
        if (service) setUsersMembership(service.name);
    }, [])

    return (
        <div className="box">
            <div className="user-title">{user.name + ' ' + user.surname}</div>
            <p>Email Address: <span className="text-blue">{user.email}</span></p>
            <p>Membership: <span className="text-blue">{usersMembership}</span></p>
        </div>
    );
};

export default UserCard;