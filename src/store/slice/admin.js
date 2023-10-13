import {createSlice}  from '@reduxjs/toolkit';

const initialState = {
    role:null,
    adminData:null,
    token:null,
};

export const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.role = action.payload.role;
            state.adminData = action.payload.adminData;
            state.token = action.payload.token;
        },

        adminLogout: (state) => {
            state.role = null;
            state.adminData = null;
            state.token = null;
        }
    }
})


export const { adminLogin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
