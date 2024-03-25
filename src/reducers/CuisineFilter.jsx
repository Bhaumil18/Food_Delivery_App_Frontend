import { createSlice } from "@reduxjs/toolkit";

const CuisineFilterSlice = createSlice({
    name: "CuisineFilter",
    initialState: {
        cuisines: [],
        isExpanded: false
    },
    reducers: {
        SetCuisine: (state, action) => {
            state.cuisines = (action.payload);
        },
        setExpanded: (state) => {
            state.isExpanded = !state.isExpanded
        }
    }
})

export const { SetCuisine , setExpanded} = CuisineFilterSlice.actions;

export default CuisineFilterSlice.reducer;