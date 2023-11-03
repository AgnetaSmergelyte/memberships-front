import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {deleteMembership} from "../features/services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const MembershipCard = ({membership}) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    async function deleteService() {
        const id = membership._id;
        const options = {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const res = await fetch("https://memberships-back.onrender.com/memberships/"+id, options)
            const data = await res.json();
            if (!data.error) dispatch(deleteMembership(id));
        } catch (err) {}
    }
    return (
        <div className="box text-center">
            <h2>${membership.price} {membership.name}</h2>
            <p>{membership.description}</p>
            <div className="separator"></div>
            <div className="d-flex j-end">
                <button className="btn-red" onClick={() => setModal(true)}><FontAwesomeIcon className="icon" icon={faTrashAlt}/></button>
            </div>
            {modal && <div className="modal-wrapper">
                <div className="modal">
                    Are you sure you want to delete this membership?
                    <div className="d-flex g10 j-center">
                        <button onClick={() => setModal(false)}>Cancel</button>
                        <button onClick={deleteService}>OK</button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default MembershipCard;