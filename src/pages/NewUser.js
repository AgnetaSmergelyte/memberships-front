import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const NewUser = () => {
    const nav = useNavigate();
    const memberships = useSelector(state => state.memberships);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const membershipRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            setSuccessMsg('');
        }, 1000)
    }, [successMsg])
    function validateEmail(mail) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    }
    async function newUser() {
        setError('');
        const name = firstNameRef.current.value;
        if (!name) {
            setError('Enter first name');
            return;
        }
        const surname = lastNameRef.current.value;
        if (!surname) {
            setError('Enter last name');
            return;
        }
        const email = emailRef.current.value;
        if (!validateEmail(email)) {
            setError('Enter correct email');
            return;
        }
        const service = memberships.find(x => x.name === membershipRef.current.value);
        if (!service) {
            setError('Error selecting membership');
            return;
        }
        const user = {
            name,
            surname,
            email,
            service_id: service._id
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        try {
            const res = await fetch("https://memberships-back.onrender.com/users", options);
            const data = await res.json();
            if (!data.error) {
                setError('');
                setSuccessMsg('New User Saved');
                setTimeout(() => {
                    nav("/users")
                }, 500);
            }
        } catch (err) {
            setError('Server Error');
        }
    }
    return (
        <div className="section">
            <h2>Create User</h2>
            <div className="box">
                <div className="user-form">
                    <div>
                        <b>First Name: <span className="text-red">*</span></b>
                        <input className="flex-1" type="text" ref={firstNameRef} placeholder="First Name"/>
                    </div>
                    <div>
                        <b>Last Name: <span className="text-red">*</span></b>
                        <input className="flex-1" type="text" ref={lastNameRef} placeholder="Last Name"/>
                    </div>
                    <div>
                        <b>E-mail Address: <span className="text-red">*</span></b>
                        <input className="flex-1" type="text" ref={emailRef} placeholder="E-mail Address"/>
                    </div>
                    <div></div>
                    <div>
                        <b>Change Membership:</b>
                        <select ref={membershipRef}>
                            {memberships.map(m => <option key={m._id} id={m._id}>{m.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <b className="error-msg">{error}</b>
                    <b className="success-msg">{successMsg}</b>
                </div>
                <div className="d-flex j-center p10 g10 mt20">
                    <button className="btn-light" onClick={() => nav("/users")}>Cancel</button>
                    <button onClick={newUser}>New User</button>
                </div>
            </div>
        </div>
    );
};

export default NewUser;