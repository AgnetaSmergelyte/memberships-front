import React from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const nav = useNavigate();
    return (
        <div className="home">
            <div onClick={() => nav("/memberships")}>Memberships</div>
            <div onClick={() => nav("/users")}>Users</div>
        </div>
    );
};

export default Home;