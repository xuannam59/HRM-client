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
            syncLocal(action.payload)
        },
        removeAuth: (state, _action) => {
            state.data = initialState;
            syncLocal({});
        }
    }
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;
export const authSelector = (state) => state.authReducer.data;

const syncLocal = (data) => {
    localStorage.setItem("authData", JSON.stringify(data));
}
