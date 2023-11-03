import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../features/services";
import UserCard from "../components/UserCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import loadingImg from "../images/loading.gif";

const Users = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [sorting, setSorting] = useState('ASC');
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetch("https://memberships-back.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                dispatch(setUsers(data.data));
            })
            .catch(err => {
                setLoading(false);
                setErrorMsg('Server is down :(');
            })
    }, [])
    async function changeSorting() {
        if (sorting === 'ASC') {
            try {
                const res = await fetch("https://memberships-back.onrender.com/usersDesc");
                const data = await res.json();
                dispatch(setUsers(data.data));
            } catch (err){}
            setSorting('DESC');
        } else {
            try {
                const res = await fetch("https://memberships-back.onrender.com/users");
                const data = await res.json();
                dispatch(setUsers(data.data));
            } catch (err){}
            setSorting('ASC');
        }
    }
    return (
        <div className="section">
            <div className="d-flex space-btw a-center">
                <h2>User Management</h2>
                <button onClick={() => nav("/users/new")}>+ New User</button>
            </div>
            <div className="d-flex j-center a-center g10">
                <b>Sorting by name: <span>{sorting}</span></b>
                <FontAwesomeIcon className="icon" icon={faSort} onClick={changeSorting}/>
            </div>
            {loading &&
                <div className="load-img-wrapper">
                    <img src={loadingImg} alt="Loading"/>
                </div>
            }
            <h2>{errorMsg}</h2>
            <div className="d-flex wrap cards">
                {users.map(x => <UserCard key={x._id} user={x}/>)}
            </div>
        </div>
    );
};

export default Users;