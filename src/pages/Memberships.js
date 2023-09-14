import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MembershipCard from "../components/MembershipCard";

const Memberships = () => {
    const nav = useNavigate();
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/memberships")
            .then(res => res.json())
            .then(data => {
                setMemberships(data.data);
            })
    }, [])

    return (
        <div className="section">
            <div className="d-flex space-btw a-center">
                <div>
                    <h2>Membership Management</h2>
                    <p>Here you can manage your membership packages. Note: Make sure you are not deleting or deactivating
                        packages assigned to active users</p>
                </div>
                <button onClick={() => nav("/memberships/new")}>+ New membership</button>
            </div>
            <div className="d-flex wrap cards">
                {memberships.map(x => <MembershipCard key={x._id} membership={x} />)}
            </div>

        </div>
    );
};

export default Memberships;