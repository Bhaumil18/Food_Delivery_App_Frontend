import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        restaurantName: '',
        items: [],
        total : 0
    },
    reducers: {
        setItem: (state, action) => {
            state.items = (action.payload);
        },
        setTotal: (state, action) => {
            state.total = (action.payload);
        },
        setRestaurant: (state, action) => {
            state.restaurantName = (action.payload);
        }
    }
})

export const { setItem, setRestaurant,setTotal } = CartSlice.actions

export default CartSlice.reducer;