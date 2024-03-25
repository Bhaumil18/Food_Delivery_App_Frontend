import axios from 'axios';
import { FetchFailure, FetchRequest, FetchSucess, LogOutFailure, LogOutRequest, LogOutSucess, LoginFailure, LoginRequest, LoginSucess } from '../reducers/User'
import { toast } from 'sonner';

const FetchUser = () => async (dispatch) => {
    try {
        dispatch(FetchRequest());
        const { data } = await axios.get('https://food-delivery-app-backend-3oiy.onrender.com/api/user/api/user', {
        // const { data } = await axios.get('http://localhost:5000/api/user', {
            headers: {
                Authorization: `Sonu ${localStorage.getItem('token')}`
            }
        })
        const user = data?.user;
        if (user) {
            dispatch(FetchSucess(user));
        }
    } catch (error) {
        toast.error('Internal error...!');
        dispatch(FetchFailure());
    }
}

const CreateUser = ({ name, email, password, address, city, pincode }) => async () => {
    try {
        const { data } = await axios.post("https://food-delivery-app-backend-3oiy.onrender.com/api/user/api/user/signup", { name: name, email: email, password: password, address: address, city: city, pincode: pincode });
        // const { data } = await axios.post("http://localhost:5000/api/user/signup", { name: name, email: email, password: password, address: address, city: city, pincode: pincode });
        toast.success(data.msg);
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}

const Login = ({ email, password, navigate }) => async (dispatch) => {
    try {
        dispatch(LoginRequest());
        const { data } = await axios.post("https://food-delivery-app-backend-3oiy.onrender.com/api/user/api/user/login", { email: email, password: password });
        // const { data } = await axios.post("http://localhost:5000/api/user/login", { email: email, password: password });
        dispatch(LoginSucess(data.user));
        localStorage.setItem('token', data.token);
        toast.success(data.msg);
        navigate('/')
    } catch (error) {
        dispatch(LoginFailure());
        toast.error(error.response.data.msg);
    }
}

const LogOut = () => async (dispatch) => {
    try {
        dispatch(LogOutRequest());
        localStorage.removeItem('token');
        dispatch(LogOutSucess());
        window.location.pathname = '/'
    } catch (error) {
        dispatch(LogOutFailure());
    }
}

const UpdateUser = (values) => async (dispatch) => {
    try {
        // const { data } = await axios.put('http://localhost:5000/api/user/update', values);
        const { data } = await axios.put('https://food-delivery-app-backend-3oiy.onrender.com/api/user/api/user/update', values);
        dispatch(FetchSucess(data.user))
        toast.success(data.msg)
    } catch (error) {
        toast.error(error.response.data.msg);
    }
}

export { CreateUser, Login, LogOut, FetchUser, UpdateUser };