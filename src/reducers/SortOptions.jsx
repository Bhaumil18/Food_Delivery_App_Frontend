import { createSlice } from "@reduxjs/toolkit";

const sortOptions = createSlice({
    name: "SortOption",
    initialState: {
        sortOptionInd: 0
    },
    reducers: {
        setSortOption: (state, action) => {
            state.sortOptionInd = action.payload;
        }
    }
})

export const { setSortOption } = sortOptions.actions;

export default sortOptions.reducer;