import {createSlice}  from '@reduxjs/toolkit';

const initialState = {
    role:null,
    userData:null,
    token:null,
    serviece:null
};

export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        userLogin : (state,action) => {
            state.role = action.payload.role;
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
        updateUserData: (state,action) => {
            state.userData = action.payload.userData;
        },
        updateServiece: (state, action) => {
            state.serviece = action.payload.serviece;
        },
        userLogout : (state) => {
            state.role = null;
            state.userData = null;
            state.token = null;
        }
    }
});

export const { userLogin, updateUserData, userLogout, updateServiece } = userAuthSlice.actions;

export default userAuthSlice.reducer;
