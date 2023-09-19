import React from 'react';
import {useDispatch} from "react-redux";
import {deleteMembership} from "../features/services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const MembershipCard = ({membership}) => {

    const dispatch = useDispatch();

    async function deleteService() {
        const id = membership._id;
        const options = {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const res = await fetch("http://localhost:8080/memberships/"+id, options)
            const data = await res.json();
            if (!data.error) dispatch(deleteMembership(id));
        } catch (err) {
            console.log('Unable to reach server');
        }
    }

    return (
        <div className="box text-center">
            <h2>${membership.price} {membership.name}</h2>
            <p>{membership.description}</p>
            <div className="separator"></div>
            <div className="d-flex j-end">
                <button className="btn-red" onClick={deleteService}><FontAwesomeIcon className="icon" icon={faTrashAlt}/></button>
            </div>
        </div>
    );
};

export default MembershipCard;