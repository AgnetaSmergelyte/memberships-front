import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MembershipCard from "../components/MembershipCard";
import {useDispatch, useSelector} from "react-redux";

const Memberships = () => {

    const nav = useNavigate();
    const memberships = useSelector(state => state.memberships);

    return (
        <div className="section">
            <div className="d-flex space-btw a-center">
                <div>
                    <h2>Membership Management</h2>
                    <p>Here you can manage your membership packages. Note: Make sure you are not deleting or deactivating
                        packages assigned to active users</p>
                </div>
                <button onClick={() => nav("/memberships/new")}>+ New Membership</button>
            </div>
            <div className="d-flex wrap cards">
                {memberships.map(x => <MembershipCard key={x._id} membership={x} />)}
            </div>
        </div>
    );
};

export default Memberships;