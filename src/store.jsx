import { configureStore } from "@reduxjs/toolkit";
import User from './reducers/User'
import Restaurants from "./reducers/Restaurants";
import Cuisines from "./reducers/CuisineFilter";

const Store = configureStore({
    reducer: {
        "user": User,
        "restaurants": Restaurants,
        "cuisines" : Cuisines
    }
})

export default Store;