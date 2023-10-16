import {createSlice}  from '@reduxjs/toolkit';

const initialState = {
    role:null,
    token:null,
    providerData:null,
    sales:null
};

export const providerAuthSlice = createSlice({
    name: "providerAuth",
    initialState,
    reducers: {
        providerLogin: (state, action) => {
            state.role = action.payload.role;
            state.providerData = action.payload.providerData;
            state.token = action.payload.token;
        },
        updateProviderData:(state, action) => {
            state.providerData = action.payload.providerData;
        },
        updateSales: (state, action) => {
            state.sales = action.payload.sales;
        },
        providerLogout: (state) => {
            state.role = null;
            state.providerData = null;
            state.token = null;
        }
    }
});

export const { providerLogin,updateProviderData, providerLogout } = providerAuthSlice.actions;
export default providerAuthSlice.reducer;
