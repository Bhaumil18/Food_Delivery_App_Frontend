import { setRestData } from "@/reducers/Restaurant";
import axios from "axios";

const getRestaurantData = ({ id }) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/restaurants/details/${id}`);
        // console.log(data.restaurant);
        dispatch(setRestData(data.restaurant));
    } catch (error) {
        console.log(error);
    }
}

export { getRestaurantData };