import { configureStore } from "@reduxjs/toolkit";
import User from './reducers/User'
import Restaurants from "./reducers/Restaurants";
import Cuisines from "./reducers/CuisineFilter";
import SortOptions from "./reducers/SortOptions";
import Restaurant from "./reducers/Restaurant";
import Cart from "./reducers/Cart";

const Store = configureStore({
    reducer: {
        "user": User,
        "restaurants": Restaurants,
        "cuisines": Cuisines,
        "sortOptions": SortOptions,
        "restaurant": Restaurant,
        "cart" : Cart
    }
})

export default Store;