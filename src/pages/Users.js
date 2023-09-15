import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../features/services";
import UserCard from "../components/UserCard";

const Users = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then(data => dispatch(setUsers(data.data)))
            .catch(err => {
                console.log('server error')
            })
    }, [])

    return (
        <div className="section">
            <div  className="d-flex space-btw a-center">
                <h2>User Management</h2>
                <button onClick={() => nav("/users/new")}>+ New User</button>
            </div>
            <div className="d-flex wrap cards">
                {users.map(x => <UserCard key={x._id} user={x} />)}
            </div>
        </div>
    );
};

export default Users;