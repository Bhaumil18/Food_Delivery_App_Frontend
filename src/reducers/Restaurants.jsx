import { createSlice } from '@reduxjs/toolkit';

const RestSlice = createSlice({
    name: 'Restaurant',
    initialState: {
        isLoading: false,
        restaurants: null,
        pagination: null,
        city : null
    },
    reducers: {
        FetchResReq: (state) => {
            state.isLoading = true;
        },
        FetchResSuc: (state, action) => {
            state.city = action.payload.city;
            state.restaurants = action.payload.data;
            state.pagination = action.payload.pagination;
            state.isLoading = false;
        },
        FetchResFail: (state) => {
            state.isLoading = false;
        }
    }
})

export const { FetchResReq,FetchResSuc,FetchResFail } = RestSlice.actions;

export default RestSlice.reducer;
