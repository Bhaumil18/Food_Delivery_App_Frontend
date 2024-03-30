import { createSlice } from "@reduxjs/toolkit";

const RestaurantSlice = createSlice({
    name: "restaurant",
    initialState: {
        restaurant : null
    },
    reducers: {
        setRestData: (state, action) => {
            state.restaurant = action.payload
        }
    }
})

export const {setRestData} = RestaurantSlice.actions

export default RestaurantSlice.reducer;