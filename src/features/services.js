import {createSlice} from "@reduxjs/toolkit";

export const servicesSlice = createSlice({
    name: "services",
    initialState: {
        memberships: [],
        users: []
    },
    reducers: {
        setMemberships: (state, action) => {
            state.memberships = action.payload;
        },
        deleteMembership: (state, action) => {
            state.memberships = state.memberships.filter(m => m._id !== action.payload);
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        deleteUser: (state, action) => {
            state.users = state.memberships.filter(m => m._id !== action.payload);
        }
    }
})

export const {setMemberships, deleteMembership, setUsers, deleteUser} = servicesSlice.actions

export default servicesSlice.reducer;