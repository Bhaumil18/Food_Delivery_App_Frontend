import { FetchResFail, FetchResReq, FetchResSuc } from "@/reducers/Restaurants";
import axios from "axios";

const FetchAllRest = ({ city, searchBy, page, cuisines }) => async (dispatch) => {
    try {
        dispatch(FetchResReq());
        const Restaurants = await axios.get(`https://food-delivery-app-backend-3oiy.onrender.com/api/restaurants/${city}`, {
        // const Restaurants = await axios.get(`http://localhost:5000/api/restaurants/${city}`, {
            params: {
                searchBy: searchBy,
                page: page,
                cuisines: cuisines
            }
        });
        dispatch(FetchResSuc(Restaurants.data));
    } catch (error) {
        dispatch(FetchResFail());
    }
}

export { FetchAllRest };