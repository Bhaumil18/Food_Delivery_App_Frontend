import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "User",
    initialState: {
        isLoading: false,
        user: null,
    },
    reducers: {

        FetchRequest: (state) => {
            state.isLoading = true;
        },
        FetchSucess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload
        },
        FetchFailure: (state) => {
            state.isLoading = false;
        },

        LoginRequest: (state) => {
            state.isLoading = true;
        },
        LoginSucess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload
        },
        LoginFailure: (state) => {
            state.isLoading = false;
        },

        LogOutRequest: (state) => {
            state.isLoading = true;
        },
        LogOutSucess: (state) => {
            state.isLoading = false;
            state.user = null
        },
        LogOutFailure: (state) => {
            state.isLoading = false;
        }
    }
})

export const {
    FetchRequest,
    FetchSucess,
    FetchFailure,
    LoginRequest,
    LoginSucess,
    LoginFailure,
    LogOutRequest,
    LogOutSucess,
    LogOutFailure,
} = UserSlice.actions;

export default UserSlice.reducer;