import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MembershipCard from "../components/MembershipCard";
import {useDispatch, useSelector} from "react-redux";
import {setMemberships} from "../features/services";
import loadingImg from "../images/loading.gif";

const Memberships = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const memberships = useSelector(state => state.memberships);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetch("https://memberships-back.onrender.com/memberships")
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                dispatch(setMemberships(data.data));
            })
            .catch(err => {
                setLoading(false);
                setErrorMsg('Server is down :(');
            })
    }, []);
    return (
        <div className="section">
            <div className="d-flex space-btw a-center g10 f-col-mobile mb-10">
                <div>
                    <h2>Membership Management</h2>
                    <p>Here you can manage your membership packages. Note: Make sure you are not deleting or
                        deactivating
                        packages assigned to active users</p>
                </div>
                <button onClick={() => nav("/memberships/new")}>+ New Membership</button>
            </div>
            {loading &&
                <div className="load-img-wrapper">
                    <img src={loadingImg} alt="Loading"/>
                </div>
            }
            <h2>{errorMsg}</h2>
            <div className="d-flex wrap cards">
                {memberships.map(x => <MembershipCard key={x._id} membership={x}/>)}
            </div>
        </div>
    );
};

export default Memberships;