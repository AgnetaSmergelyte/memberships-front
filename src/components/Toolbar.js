import React from 'react';
import {NavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <div className="toolbar">
            <NavLink className="menu-item" to="/memberships">Memberships</NavLink>
            <NavLink className="menu-item" to="/users">Users</NavLink>
        </div>
    );
};

export default Toolbar;