import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    id: '',
    fullName: '',
    role: 0
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const authReducer = authSlice.reducer;
export const { addAuth } = authSlice.actions;
export const authSelector = (state) => state.authReducer.data;
