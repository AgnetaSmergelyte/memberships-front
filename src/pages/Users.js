import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../features/services";
import UserCard from "../components/UserCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';

const Users = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [sorting, setSorting] = useState('ASC');

    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then(data => dispatch(setUsers(data.data)))
            .catch(err => {
                console.log('server error')
            })
    }, [])

    async function changeSorting() {
        if (sorting === 'ASC') {
            try {
                const res = await fetch("http://localhost:8080/usersDesc");
                const data = await res.json();
                dispatch(setUsers(data.data));
            } catch (err){}
            setSorting('DESC');
        } else {
            try {
                const res = await fetch("http://localhost:8080/users");
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
            <div className="d-flex wrap cards">
                {users.map(x => <UserCard key={x._id} user={x}/>)}
            </div>
        </div>
    );
};

export default Users;