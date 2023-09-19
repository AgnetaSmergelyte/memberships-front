import './App.css';
import {Route, Routes} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
import Users from "./pages/Users";
import NewMembership from "./pages/NewMembership";
import NewUser from "./pages/NewUser";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setMemberships} from "./features/services";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://localhost:8080/memberships")
            .then(res => res.json())
            .then(data => dispatch(setMemberships(data.data)))
            .catch(err => {})
    }, []);

    return (
        <div className="container">
            <Toolbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/memberships" element={<Memberships/>}/>
                <Route path="/memberships/new" element={<NewMembership/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/users/new" element={<NewUser/>}/>
            </Routes>
        </div>
    );
}

export default App;
