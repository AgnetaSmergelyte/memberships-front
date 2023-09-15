import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const NewMembership = () => {
    const nav = useNavigate();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setSuccessMsg('');
        }, 1000)
    }, [successMsg])

    async function newMembership() {
        const name = nameRef.current.value;
        if (!name) {
            setError('Enter name');
            return;
        }
        const price = priceRef.current.value;
        if (!Number(price) && price !== '0') {
            setError('Enter correct price');
            return;
        }
        const description = descriptionRef.current.value;
        if (!description) {
            setError('Enter description');
            return;
        }
        const service = {
            name,
            price,
            description
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(service)
        }
        try  {
            const res = await fetch("http://localhost:8080/memberships/", options);
            const data = await res.json;
            if (!data.error) {
                setError('');
                setSuccessMsg('New Membership Saved');
            }
        } catch (err) {
            setError('Server Error');
        }
    }

    return (
        <div className="section">
            <h2>Create Membership</h2>
            <div className="box">
                <div className="d-flex f-col a-center">
                    <div className="form">
                        <b className="text-right">Name</b>
                        <input type="text" ref={nameRef} placeholder="Name" />
                        <b className="text-right">Membership Price</b>
                        <input type="Number" ref={priceRef} placeholder="Membership Price"/>
                        <b className="text-right">Description</b>
                        <textarea rows="10" ref={descriptionRef} />
                    </div>
                    <b className="error-msg">{error}</b>
                    <b className="success-msg">{successMsg}</b>
                    <div className="d-flex j-center p10 g10 mt20">
                        <button className="btn-light" onClick={() => nav("/memberships")}>Cancel</button>
                        <button onClick={newMembership}>New Membership</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMembership;