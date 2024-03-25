import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { CreateUser } from '@/actions/User'

const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPinCode] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleCityChange = (e) => {
        setCity(e.target.value);
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }
    const handlePinCodeChange = (e) => {
        setPinCode(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignUp = () => {
        try {
            dispatch(CreateUser({ name, email, password, address, city, pincode }));
            navigate('/login');
        } catch (error) {
            // toast.error("Internal server error...!");
        }
    }
    return (
        <div>
            <div className="container flex flex-1 py-3 justify-center">
                <div className="w-screen max-w-[50rem] px-10 py-4 shadow-lg flex flex-col gap-5">
                    <span className="text-3xl font-bold font-serif text-center">
                        Create Account
                    </span>
                    <div className='flex gap-4'>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label>Name</Label>
                            <Input className='border border-slate-300' onChange={handleNameChange} value={name} name="name" type="text" />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label>Email</Label>
                            <Input className='border border-slate-300' onChange={handleEmailChange} value={email} name="email" type="text" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Passwrod</Label>
                        <Input className='border border-slate-300'
                            onChange={handlePasswordChange}
                            value={password}
                            name="password"
                            type="password"
                        />
                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input className='border border-slate-300' onChange={handleAddressChange} value={address} name="address" type="text" />
                        </div>
                        <div className='flex gap-4'>
                            <div className="flex flex-1 flex-col gap-2">
                                <Label>City</Label>
                                <Input className='border border-slate-300' onChange={handleCityChange} value={city} name="city" type="text" />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                                <Label>Pincode</Label>
                                <Input className='border border-slate-300' onChange={handlePinCodeChange} value={pincode} name="pincode" type="number" />
                            </div>

                        </div>
                    </div>
                    <div className="flex">
                        <Button onClick={handleSignUp} className="bg-orange-500 hover:bg-white hover:text-orange-500 text-white flex-1">Login</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUpPage