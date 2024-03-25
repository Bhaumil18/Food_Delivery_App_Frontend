import { Login } from '@/actions/User'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        try {
            dispatch(Login({ email, password,navigate }));

        } catch (error) {
            // toast.error("Internal Error...!");
        }
    }

    return (
        <div>
            <div className="container flex flex-1 py-10 justify-center">
                <div className="w-screen md:w-96 px-10 py-4 shadow-lg flex flex-col gap-5">
                    <span className="text-3xl font-bold font-serif text-center">
                        Log In
                    </span>
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChange={handleEmailChange}
                            name="emial"
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Passwrod</Label>
                        <Input
                            onChange={handlePasswordChange}
                            value={password}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="flex">
                        <Button
                            onClick={handleLogin}
                            className="bg-orange-500 hover:bg-white hover:text-orange-500 text-white flex-1"
                        >
                            Login
                        </Button>
                    </div>
                    <div className="flex text-sm justify-between text-orange-500">
                        <NavLink to={"/"}>Forgot password?</NavLink>
                        <NavLink to={"/signup"}>Create Account</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage